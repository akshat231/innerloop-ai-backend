const logger = require('../utils/logger');
const config = require('config');
const journalRepository = require('../repositories/journalRepository');
const langfuseHandler = require("../utils/langfuse");
const { PromptTemplate } = require("@langchain/core/prompts");
const innerLoopPrompts = require('../prompt');
const innerLoopSchemas = require('../outputSchema')
const initializeChatModel = require('../chatModel')
const { startOfWeek, endOfWeek, format  } = require('date-fns');

const fillEntry = async (body) => {
    try {
        logger.info('fillEntry::services');
        const { userId, text } = body;
        const inputObject = { user_journal_text: text }
        const chatModel = await initializeChatModel();
        const modelResponse = await modelInvoke(innerLoopPrompts.moodAnalysisPrompt, chatModel, inputObject, innerLoopSchemas.moodAnalysisSchema)
        const journalEntry = createJournalEntry(userId, text, JSON.parse(modelResponse.lc_kwargs.content))
        const response = await journalRepository.insertJournalEntry(journalEntry)
        return JSON.parse(modelResponse.lc_kwargs.content);
    } catch (error) {
        throw error;
    }
};


const modelInvoke = async (prompt, chatModel, inputObject = {}, outputSchema = false) => {
    try {
        let schemaObject = {};
        if (outputSchema) {
            schemaObject = {
                with_structured_output: true,
                schema: outputSchema,
            };
        }
        const promptTemplate = new PromptTemplate({
            template: prompt,
            inputVariables: Object.keys(inputObject),
        });
        const fullPrompt = await promptTemplate.format(inputObject);
        logger.info("modelInvoke::service");
        const modelResponse = await chatModel.invoke(
            fullPrompt,
            {
                callbacks: [langfuseHandler],
            },
            schemaObject
        );
        return modelResponse;
    } catch (error) {
        throw error;
    }
};

const createJournalEntry = (userId, text, llmResponse) => {
    try {
        return {
            userId: userId,
            text: text,
            mood: llmResponse.Mood,
            emotions: llmResponse.Emotions,
            themes: llmResponse.Themes,
            tone: llmResponse.Tone,
            summary: llmResponse.Summary
        }
    } catch (error) {
        throw error;
    }
};


const createWeeklySummary = (llmResponse, userId) => {
    try {
        const now = new Date();
        const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });
        const endOfWeekDate = endOfWeek(now, { weekStartsOn: 1 });
        return {
            userId: userId,
            startDate: startOfWeekDate,
            endDate: endOfWeekDate,
            mood: llmResponse.Mood,
            emotions: llmResponse.Emotions,
            themes: llmResponse.Themes,
            patterns: llmResponse.Patterns,
            suggestion: llmResponse.Suggestion,
            affirmation: llmResponse.Affirmation,

        }
    } catch (error) {
        throw error;
    }
};

const generateWeeklySummary = async (userId) => {
    try {
        logger.info('generateWeeklySummary::services');
        const existingWeeklySummary = await journalRepository.getWeeklySummary(userId);
        if (existingWeeklySummary) {
            logger.info('Weekly summary already exists for this userId');
            return existingWeeklySummary;
        }
        logger.info(`Generating weekly summary for the userId: ${userId}`);
        const lastWeekEntries = await journalRepository.getLastWeekEntries(userId);
        console.log('lastWeekEntries', lastWeekEntries)
        console.log(lastWeekEntries.length);
        if (lastWeekEntries.length === 0) {
            logger.info('No data found in last week interactions');
            return;
        }
        const journalDump = lastWeekEntries.map(e => `• ${e.createdAt.toDateString()}: ${e.text}`).join('\n\n');
        const chatModel = await initializeChatModel();
        const inputObject = {
            time_interval: 'week',
            time_format: '7 days',
            journal_dump: journalDump
        }
        const modelResponse = await modelInvoke(innerLoopPrompts.summarizerPrompt, chatModel, inputObject, innerLoopSchemas.moodAnalysisSchema)
        const weeklySummary = createWeeklySummary(JSON.parse(modelResponse.lc_kwargs.content), userId)
        const response = await journalRepository.insertWeeklySummary(weeklySummary);
        return response;
    } catch (error) {
        throw error;
    }
};

const getMoodTrends = async (userId, period) => {
    try {
        logger.info('getMoodTrends::services');
        const moodTrends = await journalRepository.getMoodTrends(userId, period);
        const grouped = {};
        moodTrends.forEach((entry) => {
            const day = format(entry.createdAt, 'yyyy-MM-dd');
            if (!grouped[day]) grouped[day] = [];
            grouped[day].push(entry.mood);
        });
        const result = Object.entries(grouped).map(([day, moods]) => {
            const freq = moods.reduce((acc, mood) => {
                acc[mood] = (acc[mood] || 0) + 1;
                return acc;
            }, {});
            const mostCommonMood = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
            return { date: day, mood: mostCommonMood };
        });
        return result;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    fillEntry,
    generateWeeklySummary,
    getMoodTrends
}
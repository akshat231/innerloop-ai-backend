const prisma = require('../utils/prisma');
const logger = require('../utils/logger');
const config = require('config');
const { startOfWeek, startOfDay, subDays, } = require('date-fns');

const insertJournalEntry = async (journalEntry) => {
    try {
        logger.info('insertJournalEntry::repositories');
        logger.info(`Inserting Data for userID: ${journalEntry.userId}`)
        const newEntry = await prisma.journalEntry.create({
            data: {
                userId: journalEntry.userId,
                text: journalEntry.text,
                mood: journalEntry.mood,
                emotions: journalEntry.emotions,
                themes: journalEntry.themes,
                tone: journalEntry.tone,
                summary: journalEntry.summary,
            },
        });
        logger.info('Data inserted Successfully')
        return newEntry;
    } catch (error) {
        throw error;
    }
};

const getLastWeekEntries = async (userId) => {
    try {
        logger.info('getLastWeekEntries::repositories');
        logger.info(`Fetching last week for userId: ${userId}`);
        const entries = await prisma.journalEntry.findMany({
            where: {
                userId,
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
            },
            orderBy: { createdAt: 'asc' },
        });
        logger.info('Last 7 days data fetched successully');
        return entries;
    } catch (error) {

    }
};


const getWeeklySummary = async (userId) => {
    try {
        logger.info('getWeeklySummary::repositories');
        logger.info(`Fetching Weekly Summary for userId: ${userId}`);
        const now = new Date();
        const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });
        const weeklySummary = await prisma.weeklySummary.findUnique({
            where: {
                userId_weekStart: {
                    userId,
                    weekStart: startOfWeekDate,
                },
            },
        });

        logger.info('Weekly Summary fetched successfully');
        return weeklySummary;
    } catch (error) {
        throw error;
    }
};

const insertWeeklySummary = async (weeklySummary) => {
    try {
        logger.info('insertWeeklySummary::repositories');
        logger.info(`Inserting Weekly Summary for userID: ${weeklySummary.userId}`)
        // Create a new entry if it doesn't exist and Journal entries are present
        const newEntry = await prisma.weeklySummary.create({
            data: {
                userId: weeklySummary.userId,
                weekStart: weeklySummary.startDate,
                weekEnd: weeklySummary.endDate,
                mood: weeklySummary.mood,
                emotions: weeklySummary.emotions,
                themes: weeklySummary.themes,
                patterns: weeklySummary.patterns,
                suggestion: weeklySummary.suggestion,
                affirmation: weeklySummary.affirmation,
            },
        });
        logger.info('Weekly Summary inserted Successfully')
        return newEntry;
    } catch (error) {
        throw error;
    }
};

const getMoodTrends = async (userId, period) => {
    try {
        logger.info('getMoodTrends::repositories');
        logger.info(`Fetching mood trends for userId: ${userId}`);
        const start = startOfDay(subDays(new Date(), period));

        const now = new Date();
        const moodTrends = await prisma.journalEntry.findMany({
            where: {
                userId,
                createdAt: { gte: start },
                NOT: { mood: null },
            },
            orderBy: { createdAt: 'asc' },
        });

        logger.info('Mood trends fetched successfully');
        return moodTrends;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    insertJournalEntry,
    getLastWeekEntries,
    getWeeklySummary,
    insertWeeklySummary,
    getMoodTrends
}
const config = require('config');
const logger = require('../utils/logger');
const { initChatModel } = require('langchain/chat_models/universal');
require('dotenv').config();

const initializeChatModel = async () => {
    try {
        logger.info('Initializing chat model');
        const model = await initChatModel(config.get('llm.openai.model'), {
            modelProvider: process.env.MODEL_PROVIDER || config.get('llm.openai.modelProvider'),
            temperature: process.env.TEMPERATURE ||config.get('llm.openai.temperature'),
            apiKey: process.env.OPEN_AI_API_KEY || config.get('llm.openai.apiKey')
        });
        return model;
    } catch (error) {
        logger.error('Error initializing chat model');
        throw error;
    }
};

module.exports = initializeChatModel
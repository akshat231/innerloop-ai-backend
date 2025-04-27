const logger = require('../utils/logger');
const config = require('config');
const journalService = require('../services/jounalService');

const fillEntry = async (body) => {
    try {
        logger.info('fillEntry::controller');
        const response = await journalService.fillEntry(body);
        return response;
    } catch (error) {
        throw error;
    }
};

const generateWeeklySummary = async (userId) => {
    try {
        logger.info('generateWeeklySummary::controller');
        const response = await journalService.generateWeeklySummary(userId);
        return response;
    } catch (error) {
        throw error;
    }
};


const getMoodTrends = async (userId, period) => {
    try {
        logger.info('getMoodTrends::controller');
        const response = await journalService.getMoodTrends(userId, period);
        return response;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    fillEntry,
    generateWeeklySummary,
    getMoodTrends
}
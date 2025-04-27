const express = require("express");
const router = express.Router();
const config = require("config");
const logger = require("../utils/logger");
const ApiResponse = require("../utils/apiResponse");
const journalController = require('../controllers/journalController');
require("dotenv").config();

router.post("/entry", async (req, res, next) => {
    try {
        logger.info(`Got Journal Entry from the user: ${req.body.userId}`);
        const { userId, text } = req.body
        const response = await journalController.fillEntry({ userId, text });
        return res.status(200).json(ApiResponse.success('Entry successfully got inserted in database',  response ))
    } catch (error) {
        logger.error(`Entry api failed due to ${error}`)
        return res.status(500).json(ApiResponse.error("Internal server error", 500));
    }
});

router.get('/weekly', async (req, res, next) => {
    try {
        logger.info('Generating summary of last 7 days records');
        const { userId } = req.query;
        if (!userId) {
            logger.error('No userId is provided');
            return res.status(500).json(ApiResponse.error('Internal server error', 500));
        }
        const response = await journalController.generateWeeklySummary(userId);
        return res.status(200).json(ApiResponse.success('Weekly Summary is generated successfully',  response ))
    } catch (error) {
        logger.error(`Weekly summarizer failed due to ${error}`);
        return res.status(500).json(ApiResponse.error('Internal server error', 500))
    }
});

router.get('/mood-trends', async (req, res, next) => {
    try {
        logger.info('Fetching mood trends for the user');
        const { userId, period } = req.query;
        if (!userId) {
            logger.error('No userId is provided');
            return res.status(500).json(ApiResponse.error('Internal server error', 500));
        }
        const response = await journalController.getMoodTrends(userId, period);
        return res.status(200).json(ApiResponse.success('Mood trends fetched successfully',  response ))
    } catch (error) {
        logger.error(`Mood trends api failed due to ${error}`);
        return res.status(500).json(ApiResponse.error('Internal server error', 500))
    }
});

module.exports = router;

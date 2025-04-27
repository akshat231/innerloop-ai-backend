const express = require("express");
const router = express.Router();
const config = require("config");
const logger = require("../utils/logger");
const ApiResponse = require("../utils/apiResponse");
const userController = require('../controllers/userController');
require("dotenv").config();

router.post('/login', async (req, res, next) => {
    try {
        console.log(req.body);
        logger.info(`Creating user of email: ${req.body.email}`);
        const { email, name } = req.body;
        const response = await userController.createUser({email, name});
        return res.status(200).json(ApiResponse.success('Entry successfully got inserted in database',  response))
    } catch (error) {
        logger.error(`Error in creating user in database due to:  ${error}`);
        return res.status(500).json(ApiResponse.error("Internal server error", 500));
    }
});

module.exports = router
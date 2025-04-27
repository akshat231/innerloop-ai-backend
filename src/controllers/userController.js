const logger = require('../utils/logger');
const config = require('config');
const userService = require('../services/userService');

const createUser = async (body) => {
    try {
    logger.info('createUser::controller');
    const response = userService.createUser(body);
    return response;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser
}
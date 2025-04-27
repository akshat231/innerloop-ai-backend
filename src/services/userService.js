const logger = require('../utils/logger');
const config = require('config');
const userRepository = require('../repositories/userRepository');

const createUser = async (body) => {
    try {
        logger.info('createUser::services');
        const existingUser = await userRepository.checkUserExists(body.email);
        if (existingUser) {
            logger.info('User already exists')
            return existingUser.id;
        }
        const newUser = await userRepository.createUser(body);
        return newUser.id;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser
}
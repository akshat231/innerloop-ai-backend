const prisma = require('../utils/prisma');
const logger = require('../utils/logger');
const config = require('config');

const checkUserExists = async (email) => {
    try {
        logger.info('checkUserExists::Repository');
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        throw error;
    }
};


const createUser = async(body) => {
    try {
        logger.info('insertJournalEntry::Repository');
        logger.info(`Inserting Data for name: ${body.name}`)
        const newEntry = await prisma.user.create({
            data: {
             email: body.email,
             name: body.name
            },
          });
        logger.info('Data inserted Successfully')
        return newEntry;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    checkUserExists
}
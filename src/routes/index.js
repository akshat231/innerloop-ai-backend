const express = require('express');
const router = express.Router();

const journalRoute = require('./journalRoute');
const userRoute = require('./userRoute')

router.use('/journal', journalRoute);
router.use('/user', userRoute);

module.exports = router;
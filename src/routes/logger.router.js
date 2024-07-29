const { Router } = require('express');
const logger = require('../config/logger');

const router = Router();

router.get('/loggerTest', (req, res) => {
    logger.debug('This is a debug log');
    logger.http('This is an http log');
    logger.info('This is an info log');
    logger.warning('This is a warning log');
    logger.error('This is an error log');
    logger.fatal('This is a fatal log');
    
    res.send('Logger test complete. Check your logs for details.');
});

module.exports = router;
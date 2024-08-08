const { Router } = require('express');
const logger = require('../config/logger');

const router = Router();

/**
 * @swagger
 * /api/loggerTest:
 *   get:
 *     summary: Test logging levels
 *     description: Endpoint to test different logging levels. Logs various types of messages to check logging configuration.
 *     tags:
 *       - Logger
 *     responses:
 *       200:
 *         description: Logger test complete. Check your logs for details.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logger test complete. Check your logs for details.
 */
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

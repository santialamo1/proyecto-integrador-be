const { Router } = require('express');
const SessionsController = require('../controllers/sessions.controller');
const passport = require('passport');
const router = Router();

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Get current user session
 *     description: Retrieves the current session information for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved current session information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "605c72ef16f2d82d8a2c1b3e"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       401:
 *         description: Unauthorized, invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Unauthorized'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Server error'
 */
router.get('/current', passport.authenticate('jwt', { session: false }), SessionsController.currentSession);

module.exports = router;

const { Router } = require('express');
const router = Router();
const { UserModel } = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const { sendEmail } = require('../utils/email');

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Request a password reset email
 *     description: Sends a password reset link to the user's email address.
 *     tags:
 *       - Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user who forgot their password.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent
 *       400:
 *         description: User not found or invalid email address.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: `You are receiving this email because you (or someone else) have requested a password reset. Please click on the following link, or paste it into your browser to complete the process: ${resetUrl}`
    });

    res.status(200).json({ message: 'Password reset email sent' });
});

module.exports = router;


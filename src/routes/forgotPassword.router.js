const express = require('express');
const router = express.Router();
const { UserModel } = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const { sendEmail } = require('../utils/email');
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

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../config/config');

const generateToken = user => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '1h' });
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { generateToken, comparePasswords };
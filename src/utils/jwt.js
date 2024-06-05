const jwt = require('jsonwebtoken');

require('dotenv').config();

JWT_SECRET_KEY   = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = { generateToken, verifyToken };

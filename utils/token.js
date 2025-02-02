const jwt = require('jsonwebtoken');

const secret = "your_secret_key";
const tokenMap = new Map();

function generateToken(user) {
    const payload = {
        id: user.id
    };
    return jwt.sign(payload, secret, {expiresIn: 24 * 60 * 60}); // Expires in 1 day
}

function verifyJWT(token) {

    if (tokenMap.has(token)) {
        throw new Error("Forbidden-empty token");
    }

    try {
        const decoded = jwt.verify(token, secret);
        return decoded.id;
    } catch (err) {
        throw new Error("Forbidden-empty token");
    }
}

function logout(token) {
    const decoded = jwt.decode(token, secret);
    tokenMap.set(token, decoded.exp);
}

module.exports = {generateToken, verifyJWT, logout, tokenMap};
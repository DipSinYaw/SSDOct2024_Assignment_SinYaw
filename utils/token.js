
const jwt = require('jsonwebtoken');

const secret = "your_secret_key";

function generateToken(user) {
    const payload = {
        id: user.id
    };
    return jwt.sign(payload, secret, { expiresIn: 7 * 24 * 60 * 60 }); // Expires in 1 hour
}

function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded.id;
    } catch (err) {
        throw new Error("Forbidden-empty token");
    }
}

module.exports = { generateToken, verifyJWT }
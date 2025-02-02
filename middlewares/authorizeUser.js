const { verifyJWT, logout } = require("../utils/token");

function authorizeUser(req, res, next) {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const authorizedUserId = verifyJWT(token);
        req.body.userId = authorizedUserId;
        next();
    } catch (err) {
        return res.status(403).json({message: "Forbidden: Invalid token"});
    }

}

function logoutUser(req, res) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        logout(token);
        return res.json({ message: "Logout successful" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { authorizeUser, logoutUser };

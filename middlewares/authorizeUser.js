const { verifyJWT, logout } = require("../utils/token");

async function authorizeUser(req, res, next) {
    console.log("check authorizeUser!! ")
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

    console.log("check token: "+token)

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const authorizedUserId = await verifyJWT(token);
        console.log("check authorizedUserId authorizedUserId: "+JSON.stringify(authorizedUserId.id))
        req.body.userId = authorizedUserId;
        console.log("check authorizedUserId body: "+JSON.stringify(req.body))
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

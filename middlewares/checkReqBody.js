async function checkReqBody(req, res, next) {
    if (req.body) {
        console.log("Check Request body:", req.body);
        console.log("Check request headers:", req.headers);
    }
    next();
}

module.exports = checkReqBody;
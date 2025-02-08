async function checkReqBody(req, res, next) {
    if (req.body) {
        console.log("Check Request body:", req.body);
        console.log("Check request headers:", req.headers);
        console.log("Check request url:", req.url);
    }
    next();
}

module.exports = checkReqBody;
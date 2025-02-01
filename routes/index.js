const express = require("express");
const orderRoutes = require("./order/OrderRoutes");
const userRoutes = require("./user/UserRoutes");
const productRoutes = require("./product/ProductRoutes");
const checkReqBody = require("../middlewares/checkReqBody");

module.exports = (config) => {
    const router = express.Router();

    router.use("/order", orderRoutes(config));
    router.use("/user", checkReqBody, userRoutes(config));
    router.use("/product", checkReqBody, productRoutes(config));

    return router;
};

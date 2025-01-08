const express = require("express");
const orderRoutes = require("./order/OrderRoutes");
const userRoutes = require("./user/userRoutes");

module.exports = (config) => {
  const router = express.Router();

  router.use("/order", orderRoutes(config));
  router.use("/user", userRoutes(config));

  return router;
};

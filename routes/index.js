const express = require("express");
const orderRoute = require("./order");

module.exports = (config) => {
  const router = express.Router();

  router.use("/order", orderRoute(config));

  return router;
};

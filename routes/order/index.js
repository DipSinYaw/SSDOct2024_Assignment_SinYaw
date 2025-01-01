const express = require("express");
const OrderService = require("../../services/OrderService");

module.exports = (config) => {
  const router = express.Router();
  const orderService = new OrderService(config.mysql.client);

  // Get all orders
  router.get("/", async (req, res, next) => {
    try {
      const orders = await orderService.getAllOrders();
      return res.render("orders", { orders });
    } catch (err) {
      return next(err);
    }
  });

  // Remove an item from an order
  router.get("/remove/:itemId", async (req, res, next) => {
    try {
      const { itemId } = req.params;
      await orderService.removeItem(itemId);
      return res.redirect("/order");
    } catch (err) {
      return next(err);
    }
  });

  // Buy an order
  router.get("/buy/:orderId", async (req, res, next) => {
    try {
      const { orderId } = req.params;
      await orderService.buyOrder(orderId);
      return res.redirect("/order");
    } catch (err) {
      return next(err);
    }
  });

  return router;
};

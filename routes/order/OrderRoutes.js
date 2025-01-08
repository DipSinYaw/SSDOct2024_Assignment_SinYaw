const express = require("express");
const OrderService = require("../../services/OrderService");
const OrderController = require("../../controllers/OrderController");

module.exports = (config) => {
    const router = express.Router();
    const orderService = new OrderService(config.mysql.client);
    const orderController = new OrderController(orderService);

    // Get all orders
    router.get("/", (req, res, next) =>
        orderController.getAllOrders(req, res, next)
    );

    // Get order by ID
    router.get("/:orderId", (req, res, next) =>
        orderController.getOrderById(req, res, next)
    );

    // Get orders by list of IDs
    router.post("/getByIds", (req, res, next) => {
        orderController.getOrdersByIds(req, res, next)
    });

    // Remove an item from an order
    router.get("/remove/:itemId", (req, res, next) =>
        orderController.removeItem(req, res, next)
    );

    // Buy an order
    router.get("/buy/:orderId", (req, res, next) =>
        orderController.buyOrder(req, res, next)
    );

    // Add a new order
    router.post("/add", (req, res, next) =>
        orderController.addOrder(req, res, next)
    );

    return router;
};

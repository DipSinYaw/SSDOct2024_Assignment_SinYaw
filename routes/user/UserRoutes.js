const express = require("express");
const UserService = require("../../services/UserService");
const UserController = require("../../controllers/UserController");
const {validateUpdateUserReq, validateDeleteUserReq} = require("../../validators/userValidator");


module.exports = (config) => {
    const router = express.Router();
    const userService = new UserService(config.mysql.client);
    const userController = new UserController(userService);

    // Get all orders
    router.get("/", (req, res, next) =>
        userController.getAllUsers(req, res, next)
    );

    // Get order by ID
    router.get("/:userId", (req, res, next) =>
        userController.getUserById(req, res, next)
    );

    // Remove an item from an order
    router.delete("/remove",validateDeleteUserReq, (req, res, next) =>
        userController.removeUser(req, res, next)
    );

    // Buy an order
    router.post("/updateById", validateUpdateUserReq, (req, res, next) =>
        userController.updateUser(req, res, next)
    );

    // Add a new order
    router.post("/add", (req, res, next) =>
        userController.addUser(req, res, next)
    );

    return router;
};

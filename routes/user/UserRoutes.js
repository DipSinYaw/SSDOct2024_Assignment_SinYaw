const express = require("express");
const UserService = require("../../services/UserService");
const UserController = require("../../controllers/UserController");
const {
  validateUpdateUserReq,
  validateDeleteUserReq,
  validateRegisterUser,
  validateLoginUser,
} = require("../../middlewares/userValidator");

module.exports = (config) => {
  const router = express.Router();
  const userService = new UserService(config.mysql.sequelize);
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
  router.delete("/remove", validateDeleteUserReq, (req, res, next) =>
    userController.removeUser(req, res, next)
  );

  // Buy an order
  router.post("/updateById", validateUpdateUserReq, (req, res, next) =>
    userController.updateUser(req, res, next)
  );

  // Add a new order
  router.post("/registerUser", validateRegisterUser, (req, res, next) => {
    console.log("Received request at /registerUser with body:", req.body);
    userController.registerUser(req, res, next);
  });

  router.post("/login", validateLoginUser, (req, res, next) =>
    userController.loginUser(req, res, next)
  );

  return router;
};

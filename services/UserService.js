const { Op } = require("sequelize");
const Models = require("../models");

class OrderService {
  constructor(sequelize) {
    if (!sequelize) {
      throw new Error("Sequelize instance is required");
    }
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async getAllOrders() {
    try {
      const orders = await this.models.Order.findAll({
        include: [{ model: this.models.OrderItem }],
      });
      return orders;
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await this.models.Order.findByPk(orderId, {
        include: [{ model: this.models.OrderItem }],
      });
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      throw new Error("Error fetching order: " + error.message);
    }
  }

  async getOrdersByIds(orderIds) {
    if (!Array.isArray(orderIds)) {
      return res.status(400).json({ error: "Request body must be a list" });
    }
    try {
      const orders = await this.models.Order.findAll({
        where: {
          id: orderIds,
        },
        include: [{ model: this.models.OrderItem }],
        order: [["createdAt", "DESC"]],
        limit: [1, 3],
      });
      return orders;
    } catch (error) {
      throw new Error("Error fetching orders by IDs: " + error.message);
    }
  }

  async removeUser(userReq) {
    try {
      const user = await this.models.user.findByPk(userReq.id);
      if (user) {
        await user.destroy();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error("Error removing User: " + error.message);
    }
  }

  async addUser(user) {
    const { id, name, email } = user;
    // const transaction = await this.client.transaction();
    try {
      const user = await this.models.user.create(
        { id: id, name: name, email: email }
        // { transaction }
      );
      //   const orderItems = items.map((item) => ({
      //     ...item,
      //     OrderId: user.id,
      //   }));
      //   await this.models.OrderItem.bulkCreate(orderItems, { transaction });
      //   await transaction.commit();
    } catch (error) {
      //   await transaction.rollback();
      throw new Error("Error adding user: " + error.message);
    }
  }
}

module.exports = OrderService;

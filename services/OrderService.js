const Models = require("../models/sequelize");

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

  async removeItem(itemId) {
    try {
      const item = await this.models.OrderItem.findByPk(itemId);
      if (item) {
        await item.destroy();
      } else {
        throw new Error("Item not found");
      }
    } catch (error) {
      throw new Error("Error removing item: " + error.message);
    }
  }

  async buyOrder(orderId) {
    try {
      const order = await this.models.Order.findByPk(orderId);
      if (order) {
        order.status = "completed";
        await order.save();
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      throw new Error("Error buying order: " + error.message);
    }
  }

  async addOrder(orderData) {
    const { userId, email, status, items } = orderData;
    const transaction = await this.client.transaction();
    try {
      const order = await this.models.Order.create(
        { userId, email, status },
        { transaction }
      );
      const orderItems = items.map((item) => ({
        ...item,
        OrderId: order.id,
      }));
      await this.models.OrderItem.bulkCreate(orderItems, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error adding order: " + error.message);
    }
  }
}

module.exports = OrderService;

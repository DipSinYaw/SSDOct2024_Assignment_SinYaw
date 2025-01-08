const { Op } = require("sequelize");
const Models = require("../models");

class UserService {
  constructor(sequelize) {
    if (!sequelize) {
      throw new Error("Sequelize instance is required");
    }
    Models(sequelize);
    this.models = sequelize.models;
  }

  async getAllUsers() {
    try {
      const users = await this.models.User.findAll();
      return users;
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.models.User.findByPk(userId);
      if (!user) {
        throw new Error("Order not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching order: " + error.message);
    }
  }

  async removeUser(userReq) {
    try {

      const user = await this.models.User.findByPk(userReq.id);
      if (user) {
        await user.destroy();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error("Error removing User: " + error.message);
    }
  }

  async updateUserById(userDetails) {
    try {
      const user = await this.models.User.findByPk(userDetails.id);
      if (!user) {
        throw new Error("User not found");
      }

      Object.keys(userDetails).forEach(key => {
        if (userDetails[key] !== null && key !== 'id') {
          user[key] = userDetails[key];
        }
      });

      await user.save(userDetails);
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async addUser(user) {
    const { id, name, email } = user;
    // const transaction = await this.client.transaction();
    try {
      const user = await this.models.User.create(
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

module.exports = UserService;

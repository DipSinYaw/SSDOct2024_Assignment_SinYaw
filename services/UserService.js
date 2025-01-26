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
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async registerUser(user) {
    const { id, name, email, password } = user;
    try {
      const hashedPassword = await hashPassword(password);
      const newUser = await this.models.User.create({
        id,
        name,
        email,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new Error("Error registering user: " + error.message);
    }
  }

  async loginUser(email, password) {
    try {
      const user = await this.models.User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error("Error logging in user: " + error.message);
    }
  }

  async updateUserById(userDetails) {
    try {
      const user = await this.models.User.findByPk(userDetails.id);
      if (!user) {
        throw new Error("User not found");
      }

      if (userDetails.password) {
        userDetails.password = await hashPassword(userDetails.password);
      }

      Object.keys(userDetails).forEach(key => {
        if (userDetails[key] !== null && key !== 'id') {
          user[key] = userDetails[key];
        }
      });

      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
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
      throw new Error("Error removing user: " + error.message);
    }
  }
}

module.exports = UserService;

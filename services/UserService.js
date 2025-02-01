const {Op} = require("sequelize");
const Models = require("../models");
const bcrypt = require("bcrypt");
const {hashPassword, validatePassword} = require("../utils/hashPassword");
const {generateToken} = require("../utils/token");

class UserService {
    constructor(sequelize) {
        if (!sequelize) {
            throw new Error("Sequelize instance is required");
        }
        Models(sequelize);
        this.models = sequelize.models;
    }

    async getAllUsers() {
        const users = await this.models.User.findAll();
        if (!users) {
            throw new Error("No users found");
        }
        return users;
    }

    async getUserById(userId) {
        const user = await this.models.User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async registerUser(user) {
        const { id, name, email, password } = user;
        const hashedPassword = await hashPassword(password);
        const newUser = await this.models.User.create({
            id,
            name,
            email,
            password: hashedPassword,
        });
        if (!newUser) {
            throw new Error("Error registering user");
        }
        return newUser;
    }

    async loginUser(email, password) {
        const user = await this.models.User.findOne({ where: { email: email } });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = await generateToken(user);
        return { user, token };
    }

    async updateUserById(userDetails) {
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
    }

    async removeUser(userReq) {
        const user = await this.models.User.findByPk(userReq.id);
        if (!user) {
            throw new Error("User not found");
        }

        await user.destroy();
        return { message: "User removed successfully" };
    }
}

module.exports = UserService;

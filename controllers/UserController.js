const {validationResult} = require("express-validator");

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await this.userService.getAllUsers();
            return res.json(users);
        } catch (err) {
            return next(err);
        }
    }

    async getUserById(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { userId } = req.params;
            const user = await this.userService.getUserById(userId);
            return res.json(user);
        } catch (err) {
            return next(err);
        }
    }

    async updateUser(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const userDetails = req.body;
            await this.userService.updateUserById(userDetails);
            return res.json({ message: "User updated successfully" });
        } catch (err) {
            return next(err);
        }
    }

    async removeUser(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = req.body;
            await this.userService.removeUser( user );
            return res.json({ message: "User removed successfully" });
        } catch (err) {
            return next(err);
        }
    }

    async addUser(req, res, next) {
        try {
            const user = req.body;
            await this.userService.addUser(user);
            return res.json({ message: "User added successfully" });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = UserController;
const { validationResult } = require("express-validator");

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            return res.json(users);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getUserById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { userId } = req.params;
            const user = await this.userService.getUserById(userId);
            return res.json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async registerUser(req, res) {
        try {
            const user = req.body;
            user.name = req.body.userName
            const newUser = await this.userService.registerUser(user);
            return res.json({ message: "User added successfully", newUser });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async loginUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const data = await this.userService.loginUser(email, password);
            console.log("check login data:"+JSON.stringify(data));
            return res.json({ message: "Login successful", data });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async updateUser(req, res) {
        console.log("check updateUser!!")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const userDetails = req.body;
            const updatedUser = await this.userService.updateUserById(userDetails);
            return res.json({ message: "User updated successfully", updatedUser });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async removeUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = req.body;
            const result = await this.userService.removeUser(user);
            return res.json(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = UserController;
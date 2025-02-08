const {body} = require("express-validator");

const validateUpdateUserReq = [
    body("id").notEmpty().withMessage("ID is required"),
];

const validateDeleteUserReq = [
    body("id").notEmpty().withMessage("Delete user, ID is required"),
];

const validateRegisterUser = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

const validateLoginUser = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
];

const validateUpdateUserById = [
];

module.exports = {
    validateUpdateUserReq,
    validateDeleteUserReq,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUserById,
};
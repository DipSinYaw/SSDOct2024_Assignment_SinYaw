const {body} = require("express-validator");

const validateUpdateUserReq = [
    body("id").notEmpty().withMessage("ID is required"),
];

const validateDeleteUserReq = [
    body("id").notEmpty().withMessage("Delete user, ID is required"),
];

router.post("/login", validateLoginUser, (req, res, next) =>
    userController.loginUser(req, res, next)
);

const validateLoginUser = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
];

module.exports = {
    validateUpdateUserReq,
    validateDeleteUserReq,
    validateLoginUser,
};
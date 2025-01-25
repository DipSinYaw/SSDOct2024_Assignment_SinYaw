const {body} = require("express-validator");

const validateUpdateUserReq = [
    body("id").notEmpty().withMessage("ID is required"),
];

const validateDeleteUserReq = [
    body("id").notEmpty().withMessage("Delete user, ID is required"),
];

module.exports = {
    validateUpdateUserReq,
    validateDeleteUserReq,
};
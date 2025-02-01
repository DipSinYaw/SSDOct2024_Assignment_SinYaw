const {body} = require("express-validator");
const validateAddProduct = [
    body("userId").notEmpty().withMessage("'userId' is required"),
    body("productName").notEmpty().withMessage("'productName' is required"),
];
const validateGetProductId = [
    body("productId").notEmpty().withMessage("'productName' is required"),
];

module.exports = {validateAddProduct, validateGetProductId};
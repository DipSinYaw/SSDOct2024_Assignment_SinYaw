const express = require("express");
const ProductService = require("../../services/ProductService");
const ProductController = require("../../controllers/ProductController");
const multer = require("multer");
const {
    validateAddProduct, validateGetProductId,
} = require("../../middlewares/productValidator");

const {
    authorizeUser
} = require("../../middlewares/authorizeUser");


const upload = multer({ storage: multer.memoryStorage() });
module.exports = (config) => {
    const router = express.Router();
    const productService = new ProductService(config.mysql.sequelize);
    const productController = new ProductController(productService);

    // Get all products
    router.get("/", authorizeUser, (req, res, next) =>
        productController.getAllProducts(req, res)
    );

    // Get product by ID
    router.get("/id", authorizeUser, validateGetProductId, (req, res, next) =>
        productController.getProductById(req, res)
    );

    // Add a new product
    router.post("/add", authorizeUser, validateAddProduct, (req, res, next) =>
        productController.addProduct(req, res)
    );

    // Update a product
    router.put("/updateById", authorizeUser, (req, res, next) =>
        productController.updateProduct(req, res)
    );

    // Remove a product
    router.delete("/remove", authorizeUser, (req, res, next) =>
        productController.deleteProduct(req, res)
    );

    router.put("/updatePhoto", authorizeUser, upload.single("photo"), (req, res, next) =>
        productController.uploadPhoto(req, res)
    );

    // Get product photo
    router.post("/getPhoto/", authorizeUser, (req, res, next) => {
        productController.getPhoto(req, res)
    });

    router.put("/like", authorizeUser, (req, res, next) => {
        productController.likeProduct(req, res)
    });

    router.put("/unlike", authorizeUser, (req, res, next) => {
        productController.unlikeProduct(req, res)
    });

    router.get("/getLikesCount", authorizeUser, (req, res, next) => {
        productController.getLikesCount(req, res)
    });


    router.get("/getProductsByCreatedAt", authorizeUser, (req, res, next) =>
        productController.getProductsByCreatedAt(req, res)
    );

    router.get("/getProductsByLikes", authorizeUser, (req, res, next) =>
        productController.getProductsByLikes(req, res)
    );

    return router;
}
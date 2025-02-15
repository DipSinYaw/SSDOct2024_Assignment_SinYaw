const { validationResult } = require("express-validator");
const validateToken = require("../middlewares/authorizeUser");

class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productService.getAllProducts();
            return res.json(products);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getProductById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { productId } = req.body;
            const product = await this.productService.getProductById(productId);
            return res.json(product);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async addProduct(req, res) {
        try {
            const product = req.body;
            const newProduct = await this.productService.addProduct(product);
            return res.json({ message: "Product added successfully", newProduct });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async updateProduct(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { productId, userId } = req.body;
            const product = req.body;
            const updatedProduct = await this.productService.updateProduct(productId, userId, product);
            return res.json({ message: "Product updated successfully", updatedProduct });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async deleteProduct(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { productId, userId } = req.body;
            const deletedProduct = await this.productService.deleteProduct(productId, userId);
            return res.json({ message: "Product deleted successfully", deletedProduct });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async likeProduct(req, res) {
        try {
            const { productId, userId } = req.body;
            const updatedProduct = await this.productService.likeProduct(productId, userId);
            return res.json({ message: "Product liked successfully", updatedProduct });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async unlikeProduct(req, res) {
        try {
            const { productId, userId } = req.body;
            const updatedProduct = await this.productService.unlikeProduct(productId, userId);
            return res.json({ message: "Product unliked successfully", updatedProduct });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getLikesCount(req, res) {
        try {
            const { productId } = req.body;
            console.log("check productId:"+productId);
            const likesCount = await this.productService.getLikesCount(productId);
            return res.json(likesCount);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getProductsByUser(req, res) {
        try {
            const { userId } = req.params;
            const products = await this.productService.getProductsByUser(userId);
            return res.json(products);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async uploadPhoto(req, res) {
        try {
            const { productId } = req.body;
            const photo = req.file; // Access the uploaded file

            console.log("check photo:"+JSON.stringify(photo));
            const base64String = Buffer.from(photo.buffer).toString('base64');
            const imgSrc = `data:${photo.mimetype};base64,${base64String}`;
            console.log("check imgSrc:" + imgSrc);

            const updatedProduct = await this.productService.uploadPhoto(productId, photo);
            return res.json({ message: "Photo uploaded successfully", updatedProduct });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getPhoto(req, res) {
        try {
            const { productId } = req.body;
            const photo = await this.productService.getPhoto(productId);

            if (!photo) {
                return res.status(404).json({ message: "Photo not found" });
            }

            const base64String = Buffer.from(photo).toString('base64');
            const imgSrc = `data:image/jpg;base64,${base64String}`;

            return res.json(imgSrc);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getProductsByCreatedAt(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { userId } = req.body;
            const product = await this.productService.getProductsByCreatedAt(userId);
            return res.json(product);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getProductsByLikes(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { userId } = req.body;
            const product = await this.productService.getProductsByLikes(userId);
            return res.json(product);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = ProductController;
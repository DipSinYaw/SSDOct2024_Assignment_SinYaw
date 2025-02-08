const Models = require("../models");

class ProductService {
  constructor(sequelize) {
    if (!sequelize) {
      throw new Error("Sequelize instance is required");
    }
    Models(sequelize);
    this.models = sequelize.models;
  }

  async getAllProducts() {
    const products = await this.models.Product.findAll({
      order: [["createdAt", "DESC"]],
    });
    if (!products) {
      throw new Error("No products found");
    }
    return products;
  }

  async getProductById(productId) {
    const product = await this.models.Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async addProduct(product) {
    const newProduct = await this.models.Product.create(product);
    if (!newProduct) {
      throw new Error("Error adding product");
    }
    return newProduct;
  }

  async updateProduct(productId, userId, product) {
    const updateFields = {};
    if (product.productName !== undefined) {
      updateFields.productName = product.productName;
    }
    if (product.status !== undefined) {
      updateFields.status = product.status;
    }

    const updatedProduct = await this.models.Product.update(updateFields, {
      where: { productId, userId },
    });

    if (!updatedProduct) {
      throw new Error("Error updating product");
    }
    return updatedProduct;
  }

  async deleteProduct(productId, userId) {
    const deletedProduct = await this.models.Product.destroy({
      where: { productId, userId },
    });
    if (!deletedProduct) {
      throw new Error("Error deleting product");
    }
    return deletedProduct;
  }

  async likeProduct(productId, userId) {
    const product = await this.models.Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const user = await this.models.User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userLikes = new Set(product.userLikes);
    if (user.id) {
      userLikes.add(user.id);
    }

    const updatedProduct = await this.models.Product.update(
      {
        userLikes: Array.from(userLikes).sort((a, b) => a - b),
      },
      {
        where: { productId },
      }
    );
    if (!updatedProduct) {
      throw new Error("Error liking product");
    }
    return updatedProduct;
  }

  async unlikeProduct(productId, userId) {
    const product = await this.models.Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const user = await this.models.User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userLikes = new Set(product.userLikes);
    if (user.id) {
      userLikes.delete(user.id);
    }

    const updatedProduct = await this.models.Product.update(
      {
        userLikes: Array.from(userLikes),
      },
      {
        where: { productId },
      }
    );
    if (!updatedProduct) {
      throw new Error("Error unliking product");
    }
    return updatedProduct;
  }

  async getLikesCount(productId) {
    const product = await this.models.Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const likesCount = product.userLikes.length;
    return likesCount;
  }

  async getProductsByUser(userId) {
    const user = await this.models.User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const products = await this.models.Product.findAll({
      where: { userLikes: userId },
    });
    if (!products) {
      throw new Error("No products found");
    }
    return products;
  }

  async uploadPhoto(productId, photo) {
    const product = await this.models.Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct = await this.models.Product.update(
      {
        photo,
      },
      {
        where: { productId },
      }
    );
    if (!updatedProduct) {
      throw new Error("Error uploading photo");
    }
    return updatedProduct;
  }

  async getPhoto(productId) {
    const product = await this.models.Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const photo = product.photo;
    if (!photo) {
      throw new Error("No photo found");
    }
    return photo;
  }
}

module.exports = ProductService;

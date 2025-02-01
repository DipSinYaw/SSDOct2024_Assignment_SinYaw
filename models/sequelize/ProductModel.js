const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("Product", {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the User model
        key: 'id', // Key in the User model that we're referencing
      },
    },
    userLikes: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Set default value to 1
    },
    photo: {
      type: DataTypes.BLOB("long"), // Add this field to store the photo
      allowNull: true,
    },
  }, {
    tableName: "Products" // Explicitly set the table name
  });

  return Product;
};
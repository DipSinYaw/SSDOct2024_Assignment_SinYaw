const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error("Sequelize instance is required");
  }

  const Order = sequelize.define("Order", {
    userId: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  const OrderItem = sequelize.define("OrderItem", {
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Order.hasMany(OrderItem, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  OrderItem.belongsTo(Order, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });

  sequelize.sync();
};

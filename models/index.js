const { Sequelize } = require("sequelize");
const initializeOrder = require("./sequelize/Order");
const initializeOrderItem = require("./sequelize/OrderItem");

module.exports = (sequelize) => {
  // if (!sequelize) {
  //   throw new Error("Sequelize instance is required");
  // }

  const Order = initializeOrder(sequelize);
  const OrderItem = initializeOrderItem(sequelize);

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

  return {
    Order,
    OrderItem,
  };
};

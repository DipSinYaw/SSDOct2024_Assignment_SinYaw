const { Sequelize } = require("sequelize");
const initializeOrder = require("./sequelize/Order");
const initializeOrderItem = require("./sequelize/OrderItem");
const initializeUser = require("./sequelize/UserModel");

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error("Sequelize instance is required");
  }

  const Order = initializeOrder(sequelize);
  const OrderItem = initializeOrderItem(sequelize);
  const Users = initializeUser(sequelize);

  //Order join OrderItem
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

  return {
    Order,
    OrderItem,
    Users,
  };
};

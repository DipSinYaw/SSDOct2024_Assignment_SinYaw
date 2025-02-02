const { Sequelize } = require("sequelize");
const initializeOrder = require("./sequelize/Order");
const initializeOrderItem = require("./sequelize/OrderItem");
const initializeUser = require("./sequelize/UserModel");
const initializeProduct = require("./sequelize/ProductModel");
const initializeConfig = require("./sequelize/ConfigModel");

module.exports = (sequelize) => {
  if (!sequelize) {
    throw new Error("Sequelize instance is required");
  }

  const Order = initializeOrder(sequelize);
  const OrderItem = initializeOrderItem(sequelize);
  const User = initializeUser(sequelize);
  const Product = initializeProduct(sequelize);
  const Config = initializeConfig(sequelize);

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

  // // Sync all models and alter tables to match the models
  // sequelize.sync({ alter: true })
  //     .then(() => {
  //       console.log("All models were synchronized successfully.");
  //     })
  //     .catch((error) => {
  //       console.error("An error occurred while synchronizing the models:", error);
  //     });

  return {
    Order,
    OrderItem,
    Users: User,
    Products: Product,
    Config,
  };
};

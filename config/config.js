import "dotenv/config";
const { Sequelize } = require("sequelize");
const pkg = require("../package.json");

const config = {
  applicationName: pkg.name,
  port: process.env.PORT || 3000,
  mysql: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "assignment_db",
    dialect: "mysql",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "password",
    sequelize: null,
  },
};

config.mysql.sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    {
      host: config.mysql.host,
      dialect: config.mysql.dialect,
    }
);

module.exports = config;
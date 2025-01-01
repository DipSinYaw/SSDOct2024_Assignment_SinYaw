const { Sequelize } = require("sequelize");
const pkg = require("../package.json");

const config = {
  applicationName: pkg.name,
  mysql: {
    options: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || "assignment_db",
      dialect: "mysql",
      username: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "password",
    },
    client: null,
  },
};

config.mysql.client = new Sequelize(
  config.mysql.options.database,
  config.mysql.options.username,
  config.mysql.options.password,
  {
    host: config.mysql.options.host,
    port: config.mysql.options.port,
    dialect: config.mysql.options.dialect,
  }
);

module.exports = config;

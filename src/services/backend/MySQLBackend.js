const mysql = require("mysql2/promise");
const CoinAPI = require("../CoinAPI");

class MySQLBackend {
  constructor() {
    this.coinAPI = new CoinAPI();
    this.connection = null;
  }

  async connect() {
    this.connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "sinyaw",
      password: "sy123456!",
      database: "webapp",
    });
    return this.connection;
  }

  async disconnect() {
    return this.connection.end();
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const sql = "INSERT INTO bitcoin_price (date, price) VALUES ?";
    const values = [];
    Object.entries(data.bpi).forEach(([date, price]) => {
      values.push([date, price]);
    });
    return this.connection.query(sql, [values]);
  }

  async getMax() {
    return this.connection.query(
      "SELECT * FROM users ORDER BY name DESC LIMIT 1"
    );
  }

  async max() {
    console.info("Connection to MySQL");
    console.time("mysql-connect");
    const connection = await this.connect();
    if (connection) {
      console.info("Successfully connected to MySQL");
    } else {
      throw new Error("Failed to connect to MySQL");
    }
    console.timeEnd("mysql-connect");

    console.info("Inserting data to MySQL");
    console.time("mysql-insert");
    const insertResult = await this.insert();
    console.timeEnd("mysql-insert");

    console.info(
      `Inserted ${insertResult[0].affetedRows} documents into MySQL`
    );

    console.info("Querying MySQL");
    console.time("mysql-find");
    const result = await this.getMax();
    const row = result[0][0];
    console.timeEnd("mysql-find");

    console.info("Disconnecting from MySQL");
    console.time("mysql-disconnect");
    await this.disconnect();
    console.timeEnd("mysql-disconnect");
    return row;
  }
}

module.exports = MySQLBackend;

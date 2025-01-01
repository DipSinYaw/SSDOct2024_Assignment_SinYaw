const express = require("express");
const routeHandler = require("./routes/index.js");
// const { initializeDatabase } = require("./config/db.js"); // Import the initializeDatabase function

module.exports = (config) => {
  const app = express();
  const port = process.env.PORT || 3000;

  // Uncomment and use this if you want to initialize the database
  // (async () => {
  //   await initializeDatabase(); // Initialize the database
  // })();

  // app.use(express.json());
  app.use("/", routeHandler(config));
  // app.use("/api", routes);

  app.get("/", (req, res) => {
    res.send(`Node and express server is running on port ${port}`);
  });

  return app;
};

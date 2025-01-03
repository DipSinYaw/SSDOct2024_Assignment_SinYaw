const express = require("express");
const path = require("path");
const routeHandler = require("./routes/index.js");

module.exports = (config) => {
  const app = express();
  const port = process.env.PORT || 3000;

  // Set the view engine to Pug
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  app.use(express.json());
  app.use("/", routeHandler(config));

  app.get("/", (req, res) => {
    res.send(`Node and express server is running on port ${port}`);
  });

  return app;
};

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger-output.json"); // Import generated spec


const cors = require('cors');
const path = require("path");
const config = require("./config/config.js");
const routeHandler = require("./routes/index.js");


const app = express();

// Serve the Swagger UI at a specific route
app.use("/api-docs", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set the view engine to Pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(express.json());
app.use("/", routeHandler(config));

app.get("/", (req, res) => {
  res.send(`Node and express server is running on port ${config.port}`);
});

app.set("port", config.port);

const port = config.port;

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

const server = app.listen(port);
server.on("error", onError);
server.on("listening", onListening);

module.exports = app;
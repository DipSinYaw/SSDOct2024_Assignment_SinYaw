import express from "express";
import routes from "./src/routes/userRoute.js";

const app = express();
const port = 3000;

routes(app);

app.get("/", (req, res) => {
  res.send(`Node and express server is running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});

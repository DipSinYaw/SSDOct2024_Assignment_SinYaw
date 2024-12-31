const routes = (app) => {
  app
    .route("/users")
    .get(
      (req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      (req, res, next) => {
        res.send("GET request successful");
      }
    )

    .post((req, res) => {
      res.send("POST request successful");
    });

  app
    .route("/users/:userId")
    .get((req, res) => {
      res.send("GET request successful");
    })

    .put((req, res) => {
      res.send("PUT request successful");
    })

    .delete((req, res) => {
      res.send("DELETE request successful");
    });
};

export default routes;

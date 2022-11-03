require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const timeout = require("connect-timeout");
const userRoutes = require("./Routers/User/UserRoute");
const listRoutes = require("./Routers/List/ListRoute");

app.use(cors());
app.use(express.json());
app.use(timeout("5s"));

app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use("/user", userRoutes);
app.use("/list", listRoutes);

// Not found handling
app.use((req, res, next) => {
  res.status(404);
  const error = new Error("not found");
  next(error);
});

// Errors handling
app.use((error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running and app is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

const express = require("express");
const routingIndex = require("./controller/index");
const cors = require("cors");
const app = express();

// body-parse
app.use(express.json());
app.use(cors());
// routing the requests
app.use("/api", routingIndex);

// Error Handling

// TODO: return resource not 404 error

// default server endponit
app.use((req, res, next) => {
  res.status(201).json({
    message: "Connected to Server",
  });
  res.end();
});

module.exports = app;

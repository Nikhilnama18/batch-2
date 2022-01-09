const express = require("express");
const routingIndex = require("./controller/index");
const cors = require("cors");
const app = express();

// body-parse
app.use(express.json());
app.use(cors());

// Log all incomming requests info to console.
app.use((req, res, next) => {
  console.log(`Hit at ${req.url} , METHOD : ${req.method} `);
  next();
});

// routing the requests
app.use("/api", routingIndex);

// No resource matched
app.use((req, res, next) => {
  res.status(404).json({
    message: "Requested resource not found.",
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.log("[ISE] :", err);

  res
    .status(500)
    .send({ message: "Internal Server Error. Please check back later." });
});

module.exports = app;

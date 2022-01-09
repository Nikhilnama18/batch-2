const express = require("express");
const userRegister = require("./userRegister");
const userAuthenticate = require("./userAuthenticate");
const userController = require("./userController");
const foodController = require("./foodController");
const route = express();

route.use("/register", userRegister);
route.use("/authenticate", userAuthenticate);
route.use("/users", userController);

route.use("/food", foodController);

module.exports = route;

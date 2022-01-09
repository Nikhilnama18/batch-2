const express = require("express");
const userRegister = require("./userRegister");
const userAuthenticate = require("./userAuthenticate");
const userController = require("./userController");
const foodController = require("./foodController");
const authentication = require("../util/authentication");
const router = express();

router.use("/register", userRegister);
router.use("/authenticate", userAuthenticate);

router.use("/users", authentication, userController);

router.use("/food", authentication, foodController);

module.exports = router;

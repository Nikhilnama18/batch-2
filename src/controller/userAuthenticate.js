const express = require("express");
const { body, validationResult } = require("express-validator");
const UserService = require("../service/userService");
const router = express();

const userService = new UserService();

router.post(
  "/",
  body("username").isString(),
  body("password").isString(),
  async (req, res, next) => {
    try {
      const ValidationErr = validationResult(req);
      if (!ValidationErr.isEmpty()) {
        res.status(404).json({
          Message: "Validation Error",
        });
      }
      
      const result = await userService.getPassword(
        req.body.username,
        req.body.password
      );
      if (result == true) {
        res.status(200).json({
          message: "User logged in successful",
        });
      } else {
        res.status(403).json({
          message: "Invalid User credentials",
        });
      }
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;

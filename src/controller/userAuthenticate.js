const express = require("express");
const { body, validationResult } = require("express-validator");
const UserService = require("../service/userService");
const jwt = require("jsonwebtoken");
const router = express();

const userService = new UserService();

router.post(
  "/",
  body("username").isString(),
  body("password").isString(),
  async (req, res, next) => {
    try {
      const validationErr = validationResult(req);
      if (!validationErr.isEmpty()) {
        return res.status(404).json({
          Message: "Validation Error ",
          ...validationErr,
        });
      }

      const result = await userService.verifyPassword(
        req.body.username,
        req.body.password
      );

      if (!result)
        return res.status(403).json({
          message: "Invalid User credentials",
        });

      const jwtToken = jwt.sign(
        { username: req.body.username },
        process.env.PrivateKey,
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({
        message: "User logged in successful",
        token: jwtToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

const express = require("express");
const UserService = require("../service/userService");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const userService = new UserService();
const router = express();

router.post(
  "/",
  body("id").isNumeric(),
  body("username").isString(),
  body("email").isEmail(),
  body("password").isString(),
  body("address.houseno").isNumeric(),
  body("address.street").isString(),
  body("address.city").isString(),
  body("address.state").isString(),
  body("address.zip").isNumeric().isLength({ min: 6 }),
  async (req, res, next) => {
    try {
      const validationErr = validationResult(req);
      if (!validationErr.isEmpty()) {
        res.status(404).json({
          message: "Validaion Error",
        });
        return;
      }
      const user_obj = {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: {
          houseno: req.body.address.houseno,
          street: req.body.address.street,
          city: req.body.address.city,
          state: req.body.address.state,
          zip: req.body.address.zip,
        },
      };

      const result = await userService.createUser(user_obj);
      if (result.rowCount != 0) {
        res.status(201).send(result);
        res.end();
      } else {
        res.status(401).json({
          message: `User with ID: ${user_obj.id} or Name:   ${user_obj.username} is already present`,
        });
      }
    } catch (error) {
      console.log("error from userRegister", error);
    }
  }
);

module.exports = router;

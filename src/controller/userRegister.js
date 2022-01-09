const express = require("express");
const router = express();
const UserService = require("../service/userService");
const userService = new UserService();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("id").isNumeric(),
  body("username").isString(),
  body("email").isEmail(),
  body("password").isString(),
  // body('houseno').isNumeric(),
  // body('street').isString(),
  // body('city').isString(),
  // body('state').isString(),
  // body('zip').isNumeric().isLength({min: 6}),
  async (req, res, next) => {
    try {
      const user = {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // address={
        // houseno=req.body.houseno,
        // street=req.body.street,
        // city= req.body.city,
        // state= req.body.stat,
        // zip: req.body.zip
        // }
      };
      const result = await userService.createUser(user);
      if (result != 0) {
        res.status(200).send(result);
        res.end();
      }
    } catch (error) {
      console.log("error from userRegister", error);
    }
  }
);

module.exports = router;

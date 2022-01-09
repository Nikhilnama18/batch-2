const express = require("express");
const { body, validationResult } = require("express-validator");
const UserService = require("../service/userService");
const { isNumeric } = require("validator").default;

const userService = new UserService();
const router = express();

router.get("/:userID", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    // ID validation
    if (!isNumeric(userID)) {
      res.status(400).json({
        Message: "ID should be of type integer",
      });
      return;
    }

    const result = await userService.getUserById(userID);

    if (result != undefined) {
      res.status(200).send(result);
      res.end();
    } else {
      res.status(400).json({
        Message: `Sorry user With ID ${userID} not found`,
      });
      res.end();
    }
  } catch (error) {
    console.log("Error in UC get ", error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).send(result);
    res.end();
  } catch (error) {
    console.log("error in get user ", error);
  }
});

router.put(
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
        // throw validation error
        res.status(404).json({
          Message: "Validation Error",
          ...validationErr,
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

      const result = await userService.updateUser(user_obj);
      if (result != undefined) {
        res.status(200).send(result);
      } else {
        res.status(400).json({
          Message: `Sorry user With ID ${user_obj.id} not found`,
        });
        res.end();
      }
    } catch (error) {
      console.log("error in put user", error);
    }
  }
);

router.delete("/:userID", async (req, res, next) => {
  const userID = req.params.userID;
  // ID validation
  if (!isNumeric(userID)) {
    res.status(400).json({
      Message: "ID should be of type integer",
    });
    return;
  }
  const result = await userService.deleteUserById(userID);
  if (result.rowCount <= 0) {
    res.status(404).json({
      Message: `Sorry user With ID ${userID} not found`,
    });
    res.end();
    return;
  }
  res.status(200).json({ Message: `User Deleted Succussfully` });
  res.end();
});

module.exports = router;

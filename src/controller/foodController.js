const express = require("express");
const FoodService = require("../service/foodService");
const { body, validationResult } = require("express-validator");
const router = express();
const { isNumeric } = require("validator").default;

//create an Object for FoodService class
const foodService = new FoodService();

// get Food Item based on ID
router.get("/:foodID", async (req, res, next) => {
  try {
    const foodID = req.params.foodID;

    // foodID validation
    if (!isNumeric(foodID)) {
      res.status(400).json({
        message: "ID should be of type integer",
      });
      return;
    }
    const result = await foodService.findFoodByID(foodID);

    //Food Not found
    if (result.rowCount <= 0) {
      res.status(400).json({
        Message: "Sorry Food Not Found",
      });
    }

    //Food Found
    res.status(201).json({
      id: result.rows[0].id,
      foodId: result.rows[0].foodid,
      foodName: result.rows[0].foodname,
      foodCost: result.rows[0].foodcost,
      foodType: result.rows[0].foodtype,
    });
    res.end();
  } catch (error) {
    console.log("Error in register :", error);
  }
});

// Create a Food Item
router.post(
  "/",
  body("foodId").isNumeric(),
  body("foodName").isString(),
  body("foodCost").isNumeric(),
  body("foodType").isIn(["Indian", "Chinese", "Mexican"]).isString(),
  async (req, res, next) => {
    try {
      const validationErr = validationResult(req);
      if (!validationErr.isEmpty()) {
        // throw Validation error
        res.status(404).json({
          message: "Validation Error",
        });
        return;
      }

      const food_obj = {
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        foodCost: req.body.foodCost,
        foodType: req.body.foodType,
      };

      const result = await foodService.createFoodItem(food_obj);
      // Already Present
      if (result.rowCount == 0) {
        res.status(404).json({
          message: `Food with ID ${food_obj.foodId} present`,
        });
        return;
      }
      res.status(201).json({
        id: result.rows[0].id,
        foodId: result.rows[0].foodid,
        foodName: result.rows[0].foodname,
        foodCost: result.rows[0].foodcost,
        foodType: result.rows[0].foodtype,
      });
      res.end();
    } catch (error) {
      console.log("Error in register put :", error);
    }
  }
);

// Update Food Item

router.put(
  "/",
  body("id").isNumeric(),
  body("foodId").isNumeric(),
  body("foodName").isString(),
  body("foodCost").isNumeric(),
  body("foodType").isIn(["Indian", "Chinese", "Mexican"]).isString(),

  async (req, res, next) => {
    try {
      const validationErr = validationResult(req);

      if (!validationErr.isEmpty()) {
        // throw a validaion error
        res.status(404).json({
          message: "Validation Error",
        });
        return;
      }

      const food_obj = {
        id: req.body.id,
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        foodCost: req.body.foodCost,
        foodType: req.body.foodType,
      };
      const result = await foodService.updateFoodById(food_obj);
      if (result.rowCount <= 0) {
        // food Item not presnt
        res.status(404).json({
          message: `Sorry Food with foodId ${req.body.foodId} not present`,
        });
        res.end();
      }
      // if present
      res.status(200).send(result.rows[0]);
      res.end();
    } catch (error) {
      console.log("Error in food put ", error);
    }
  }
);
module.exports = router;

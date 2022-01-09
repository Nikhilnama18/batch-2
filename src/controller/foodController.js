const express = require("express");
const FoodService = require("../service/foodService");
const { body, validationResult } = require("express-validator");
const router = express();

//create an Object for FoodService class
const foodService = new FoodService();

router.get("/:foodID", async (req, res, next) => {
  try {
    const foodID = req.params.foodID;
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
  } catch (error) {}
});

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
        console.log("Validations not done");
      }
      const food_obj = {
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        foodCost: req.body.foodCost,
        foodType: req.body.foodType,
      };

      const result = await foodService.createFoodItem(food_obj);
      res.status(201).json({
        id: result.rows[0].id,
        foodId: result.rows[0].foodid,
        foodName: result.rows[0].foodname,
        foodCost: result.rows[0].foodcost,
        foodType: result.rows[0].foodtype,
      });
      res.end();
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;

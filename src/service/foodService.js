const FoodRepositry = require("../repositry/foodRepositry");
const foodRepositry = new FoodRepositry();

class FoodService {
  async createFoodItem(food_obj) {
    try {
      const foodPresent = await foodRepositry.findFoodByID(food_obj.foodId);
      if (foodPresent.rowCount <= 0) {
        return await foodRepositry.createFoodItem(food_obj);
      } else {
        // Handle is Already present
        foodPresent.rowCount = 0;
        return foodPresent;
      }
    } catch (error) {
      throw error;
    }
  }
  async findFoodByID(food_ID) {
    try {
      return await foodRepositry.findFoodByID(food_ID);
    } catch (error) {
      throw error;
    }
  }

  async getAllFood() {
    try {
      return await foodRepositry.getAllFoodItems();
    } catch (error) {
      throw error;
    }
  }

  async updateFoodById(food_obj) {
    try {
      const foodPresent = await foodRepositry.findFoodByID_FID(
        food_obj.id,
        food_obj.foodId
      );
      if (foodPresent.rowCount <= 0) {
        // foodItem not present
        return foodPresent;
      }

      const result = await foodRepositry.updateFoodById(food_obj);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteFoodById(foodID) {
    try {
      const result = await foodRepositry.findFoodByID(foodID);
      if (result.rowCount <= 0) {
        return result;
      }
      return await foodRepositry.deleteFoodByID(foodID);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FoodService;

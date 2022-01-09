const FoodRepositry = require("../repositry/foodRepositry");
const foodRepositry = new FoodRepositry();

class FoodService {
  async createFoodItem(food_obj) {
    const foodPresent = await foodRepositry.findFoodByID(food_obj.foodId);
    if (foodPresent.rowCount <= 0) {
      return await foodRepositry.createFoodItem(food_obj);
    } else {
      // Handle is Already present
      return foodPresent;
    }
  }
  async findFoodByID(food_ID) {
    return await foodRepositry.findFoodByID(food_ID);
  }

  async updateFoodById(food_obj) {
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
  }
}

module.exports = FoodService;

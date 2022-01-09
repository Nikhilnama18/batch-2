const FoodRepositry = require("../repositry/foodRepositry");
const foodRepositry = new FoodRepositry();

class FoodService {
  async createFoodItem(food_obj) {
    const foodpresent = await foodRepositry.findFoodByID(food_obj.foodId);
    if (foodpresent.rowCount <= 0) {
      return await foodRepositry.createFoodItem(food_obj);
    } else {
      // Handle is Already present
      return foodpresent;
    }
  }
  async findFoodByID(food_ID) {
    return await foodRepositry.findFoodByID(food_ID);
  }
}

module.exports = FoodService;

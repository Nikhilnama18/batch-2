const { FindFoodById_Q, CreateFood_Q } = require("../quries/Qfood");
const { Client } = require("pg");
const { UpdateFoodById_Q, FindFoodById_FID_Q } = require("../quries/Qfood");

const clinet = new Client({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

clinet.connect();

class FoodRepositry {
  async createFoodItem(food_obj) {
    return await clinet.query(CreateFood_Q, [
      food_obj.foodId,
      food_obj.foodName,
      food_obj.foodCost,
      food_obj.foodType,
    ]);
  }

  async findFoodByID(foodID) {
    return await clinet.query(FindFoodById_Q, [foodID]);
  }

  async findFoodByID_FID(id, foodId) {
    return await clinet.query(FindFoodById_FID_Q, [id, foodId]);
  }

  async updateFoodById(food_obj) {
    return await clinet.query(UpdateFoodById_Q, [
      food_obj.id,
      food_obj.foodId,
      food_obj.foodName,
      food_obj.foodCost,
      food_obj.foodType,
    ]);
  }
}

module.exports = FoodRepositry;

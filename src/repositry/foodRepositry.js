const {
  FindFoodById_Q,
  CreateFood_Q,
  DeleteFoodById_Q,
  UpdateFoodById_Q,
  FindFoodById_FID_Q,
  GetALLFoodItems_Q,
} = require("../quries/Qfood");
const { Client } = require("pg");

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
    try {
      return await clinet.query(CreateFood_Q, [
        food_obj.foodId,
        food_obj.foodName,
        food_obj.foodCost,
        food_obj.foodType,
      ]);
    } catch (error) {
      throw error;
    }
    I;
  }

  async findFoodByID(foodID) {
    try {
      return await clinet.query(FindFoodById_Q, [foodID]);
    } catch (error) {
      throw error;
    }
  }

  async findFoodByID_FID(id, foodId) {
    try {
      return await clinet.query(FindFoodById_FID_Q, [id, foodId]);
    } catch (error) {
      throw error;
    }
  }

  async getAllFoodItems() {
    try {
      return await clinet.query(GetALLFoodItems_Q);
    } catch (error) {
      throw error;
    }
  }

  async updateFoodById(food_obj) {
    try {
      return await clinet.query(UpdateFoodById_Q, [
        food_obj.id,
        food_obj.foodId,
        food_obj.foodName,
        food_obj.foodCost,
        food_obj.foodType,
      ]);
    } catch (error) {
      throw error;
    }
  }

  async deleteFoodByID(foodID) {
    try {
      const result = await clinet.query(DeleteFoodById_Q, [foodID]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FoodRepositry;

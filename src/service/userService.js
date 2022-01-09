const UserRepositry = require("../repositry/userRepositry");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepositry = new UserRepositry();
const { UpdateError } = require("../util/customErrors");

class UserService {
  async createUser(user_obj) {
    try {
      const userPresent = await userRepositry.findUserById_NAME(
        user_obj.id,
        user_obj.username
      );
      if (userPresent.rowCount <= 0) {
        user_obj.password = await bcrypt.hash(
          user_obj.password,
          parseInt(process.env.saltRounds)
        );
        return await userRepositry.createUser(user_obj);
      } else {
        userPresent.rowCount = 0;
        return userPresent;
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyPassword(u_name, u_password) {
    try {
      const result = await userRepositry.getPassword(u_name);
      if (result.rowCount <= 0) {
        return false;
      }
      return await bcrypt.compare(u_password, result.rows[0].u_password);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userID) {
    try {
      return await userRepositry.getUserById(userID);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await userRepositry.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  async updateUser(user_obj) {
    try {
      // Check new username
      const result = await userRepositry.findUserByName(user_obj.username);
      if (result.rowCount > 0) throw new UpdateError("User Name already exits");

      // Check requested id
      const res = await userRepositry.findUserById(user_obj.id);
      if (res.rowCount <= 0)
        throw new UpdateError(`Sorry user With ID ${user_obj.id} not found`);

      // Update user details
      return await userRepositry.updateUserById(user_obj);
    } catch (error) {
      throw error;
    }
  }
  async deleteUserById(userID) {
    try {
      const result = await userRepositry.findUserById(userID);
      if (result.rowCount <= 0) return result;
      return await userRepositry.deleteUserById(userID);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserService;

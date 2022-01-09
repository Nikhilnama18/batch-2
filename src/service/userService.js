const UserRepositry = require("../repositry/userRepositry");
const bcrypt = require("bcrypt");
const util = require("util");
const userRepositry = new UserRepositry();

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

  async getPassword(u_name, u_password) {
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
      const res = await userRepositry.findUserById(user_obj.id);
      if (res.rowCount >= 0) {
        return await userRepositry.updateUserById(user_obj);
      } else {
        return;
      }
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

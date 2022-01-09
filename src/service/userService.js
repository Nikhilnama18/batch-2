const UserRepositry = require("../repositry/userRepositry");
const userRepositry = new UserRepositry();

class UserService {
  async createUser(user_obj) {
    try {
      const userPresent = await userRepositry.findUserById(user_obj.id);
      if (userPresent.rowCount <= 0) {
        return await userRepositry.createUser(user_obj);
      } else {
        userPresent.rowCount = 0;
        return userPresent;
      }
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

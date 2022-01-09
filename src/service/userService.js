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
      console.log("Error is userSerivce", error);
    }
  }
  async getUserById(userID) {
    return await userRepositry.getUserById(userID);
  }

  async getAllUsers() {
    return await userRepositry.getAllUsers();
  }

  async updateUser(user_obj) {
    const res = await userRepositry.findUserById(user_obj.id);
    if (res.rowCount >= 0) {
      return await userRepositry.updateUserById(user_obj);
    } else {
      return;
    }
  }
  async deleteUser() {}
}
module.exports = UserService;

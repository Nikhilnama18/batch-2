const userRepositry = require("../repositry/userRepositry");
const userrepositry = new userRepositry();

class UserService {
  async createUser(user_obj) {
    try {
      const userPresent = await userrepositry.findUserById(user_obj.id);
      if (userPresent.rowCount <= 0) {
        return await userrepositry.createUser(user_obj);
      } else {
        return 0;
      }
    } catch (error) {
      console.log("Error is userSerivce", error);
    }
  }
  async findUserById() {
    return await userrepositry.findUserById();
  }
  async getAllUsers() {}
  async getUserById() {}
  async updateUses() {}
  async deleteUser() {}
}
module.exports = UserService;

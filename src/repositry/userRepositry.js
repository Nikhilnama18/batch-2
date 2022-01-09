const { Client } = require("pg");
const { CreateUser_Q, FindUserById_Q } = require("../quries/Quser");

const client = new Client({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

client.connect();

class userRepositry {
  async createUser(user_obj) {
    return await client.query(CreateUser_Q, [
      user_obj.id,
      user_obj.username,
      user_obj.email,
      user_obj.password,
    ]);
  }
  async findUserById(id) {
    return await client.query(FindUserById_Q, [id]);
  }
}
module.exports = userRepositry;

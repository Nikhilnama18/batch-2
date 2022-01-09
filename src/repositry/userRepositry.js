const { Client } = require("pg");
const {
  CreateUser_Q,
  FindUserById_Q,
  GetAllUsers_Q,
  UpdateUserById_Q,
} = require("../quries/Quser");

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
    const result = await client.query(CreateUser_Q, [
      user_obj.id,
      user_obj.username,
      user_obj.email,
      user_obj.password,
      user_obj.address.houseno,
      user_obj.address.street,
      user_obj.address.city,
      user_obj.address.state,
      user_obj.address.zip,
    ]);

    const res_obj = {
      id: result.rows[0].id,
      username: result.rows[0].u_name,
      email: result.rows[0].u_email,
      password: result.rows[0].u_password,
      address: {
        houseno: result.rows[0].houseno,
        street: result.rows[0].street,
        city: result.rows[0].city,
        state: result.rows[0].state,
        zip: result.rows[0].zip,
      },
    };

    return res_obj;
  }

  async findUserById(id) {
    return await client.query(FindUserById_Q, [id]);
  }

  async getUserById(id) {
    const result = await client.query(FindUserById_Q, [id]);
    // console.log("", result);
    var res_obj;
    if (result.rowCount <= 0) {
      return res_obj;
    }
    res_obj = {
      id: result.rows[0].id,
      username: result.rows[0].u_name,
      email: result.rows[0].u_email,
      password: result.rows[0].u_password,
      address: {
        houseno: result.rows[0].houseno,
        street: result.rows[0].street,
        city: result.rows[0].city,
        state: result.rows[0].state,
        zip: result.rows[0].zip,
      },
    };
    return res_obj;
  }

  async getAllUsers() {
    const result = await client.query(GetAllUsers_Q);
    const res_obj = [];
    for (var i = 0; i < result.rowCount; i++) {
      const recod = {
        id: result.rows[i].id,
        username: result.rows[i].u_name,
        email: result.rows[i].u_email,
        password: result.rows[i].u_password,
        address: {
          houseno: result.rows[i].houseno,
          street: result.rows[i].street,
          city: result.rows[i].city,
          state: result.rows[i].state,
          zip: result.rows[i].zip,
        },
      };
      res_obj.push(recod);
    }
    return res_obj;
  }

  async updateUserById(user_obj) {
    const result = await client.query(UpdateUserById_Q, [
      user_obj.id,
      user_obj.username,
      user_obj.email,
      user_obj.password,
      user_obj.address.houseno,
      user_obj.address.street,
      user_obj.address.city,
      user_obj.address.state,
      user_obj.address.zip,
    ]);

    const res_obj = {
      id: result.rows[0].id,
      username: result.rows[0].u_name,
      email: result.rows[0].u_email,
      password: result.rows[0].u_password,
      address: {
        houseno: result.rows[0].houseno,
        street: result.rows[0].street,
        city: result.rows[0].city,
        state: result.rows[0].state,
        zip: result.rows[0].zip,
      },
    };
    return res_obj;
  }
}

module.exports = userRepositry;

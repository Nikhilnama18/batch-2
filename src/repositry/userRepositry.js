const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const {
  CreateUser_Q,
  FindUserById_Q,
  GetAllUsers_Q,
  UpdateUserById_Q,
  DeleteUserById_Q,
  FindUserById_Name_Q,
  GetPassword_Q,
  FindUserByName_Q,
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
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async getPassword(u_name) {
    try {
      return await client.query(GetPassword_Q, [u_name]);
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    try {
      return await client.query(FindUserById_Q, [id]);
    } catch (error) {
      throw error;
    }
  }
  async findUserByName(id) {
    try {
      return await client.query(FindUserByName_Q, [id]);
    } catch (error) {
      throw error;
    }
  }

  async findUserById_NAME(id, u_name) {
    try {
      return await client.query(FindUserById_Name_Q, [id, u_name]);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const result = await client.query(FindUserById_Q, [id]);
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
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(user_obj) {
    try {
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

      var res_obj;
      if (result.rowCount > 0) {
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
      }
      return res_obj;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(userID) {
    try {
      return await client.query(DeleteUserById_Q, [userID]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userRepositry;

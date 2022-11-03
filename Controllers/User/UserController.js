require("dotenv").config();
const knex = require("../../db/knex");
const { ERROR_MSGS } = require("../../Configs/Constants");

const UserController = {
  getUserById: async (req, res) => {
    try {
      const { userid } = req.params;
      console.log(userid);
      const data = await knex
        .select({
          userid: "id",
          userName: "user_name",
          userEmail: "user_email",
          userProPic: "user_pro_pic",
          userPassword: "user_password",
        })
        .from("users")
        .where("id", "=", userid);
      console.log(data);
      if (data.length > 0) {
        res.status(200).json(data[0]);
        return;
      }
      res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  getUsersInList: async (req, res) => {
    try {
      const { listid } = req.params;
      console.log(listid);
      const data = await knex
        .select({
          userId: "user_id",
          userName: "user_name",
          userEmail: "user_email",
          userProPic: "user_pro_pic",
        })
        .from("users_in_list")
        .join("users", { "users.id": "users_in_list.user_id" })
        .where("users_in_list.list_id", "=", listid);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  signup: async (req, res) => {
    try {
      const { userName, userEmail, userProPic, userPassword } = req.body;
      console.log(userName, userEmail, userProPic, userPassword);
      const newUser = {
        user_name: userName,
        user_email: userEmail,
        user_pro_pic: userProPic,
        user_password: userPassword,
      };
      const data = await knex("users").returning(["id"]).insert(newUser);
      console.log(data);
      res.status(200).json(data[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};
module.exports = UserController;

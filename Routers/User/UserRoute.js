const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/User/UserController");
const { validateSignUp } = require("../../Controllers/validationMiddleWare");

router.get("/:userid", user_ctrl.getUserById);
router.get("/list/:listid", user_ctrl.getUsersInList);
router.post("/signup/", validateSignUp, user_ctrl.signup);
module.exports = router;

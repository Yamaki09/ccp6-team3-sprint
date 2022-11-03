const express = require("express");
require("dotenv").config();
const knex = require("../db/knex");
const { REGEXES, ERROR_MSGS } = require("../Configs/Constants");

const validateSignUp = async (req, res, next) => {
  try {
    const { userName, userEmail, userProPic, userPassword } = req.body;
    const isRequestValid = [userName, userEmail, userProPic, userPassword].some(
      (value) => value !== undefined
    );
    const isEmailValid = userEmail.match(REGEXES.EMAIL);
    const errorMessage = [];

    if (!isRequestValid) errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    if (!isEmailValid) {
      errorMessage.push(ERROR_MSGS.INVALID_EMAIL);
    }
    const data = await knex
      .select("*")
      .from("users")
      .where({ user_email: userEmail });

    if (data.length > 0) {
      errorMessage.push(ERROR_MSGS.EMAIL_IN_USE);
    }
    if (errorMessage.length > 0) {
      res.status(400).json({
        message: ERROR_MSGS.VALIDATION_ERROR,
        error: JSON.stringify(errorMessage),
      });
      return;
    } else {
      next();
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
  }
};
const validatePostList = async (req, res, next) => {
  try {
    const { listName, userid } = req.body;
    const isRequestValid = [listName, userid].some(
      (value) => value !== undefined
    );
    const errorMessage = [];

    if (!isRequestValid) errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    if (!listName) errorMessage.push(ERROR_MSGS.INVALID_INPUT);
    if (!userid) errorMessage.push(ERROR_MSGS.INVALID_INPUT);

    if (errorMessage.length > 0) {
      res.status(400).json({
        message: ERROR_MSGS.VALIDATION_ERROR,
        error: JSON.stringify(errorMessage),
      });
      return;
    } else {
      next();
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  validateSignUp,
  validatePostList,
};

import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
import { where } from "sequelize/lib/sequelize";
import { name } from "ejs";
import { createJWT } from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }

  return false;
};

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);

  return hashPassword;
};

const createNewUser = async (userData) => {
  try {
    let isEmailExist = await checkEmailExist(userData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }

    let hashPass = hashUserPassword(userData.password);
    await db.User.create({
      fullName: userData.fullName,
      email: userData.email,
      password: hashPass,
      user_type: "applicant",
    });

    return {
      EM: "Registered successfully",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrongs in service",
      EC: -2,
    };
  }
};

const userLogin = async (userData) => {
  try {
    // Check if the email exists
    let user = await db.User.findOne({
      where: { email: userData.email },
    });

    if (!user) {
      return {
        EM: "The email does not exist",
        EC: 1,
      };
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(
      userData.password,
      user.password
    );
    //console.log("check email", user.email)
    if (isPasswordValid) {
      let payload = {
        email: user.email,
        expiresIn: process.env.JWT_EXPIRES_IN,
      };
      let token = createJWT(payload);
      return {
        EM: "Login successfully",
        EC: 0,
        DT: {
          access_token: token,
        },
      };
    } else {
      return {
        EM: "Wrong password",
        EC: 1,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
    };
  }
};
const userService = {
  createNewUser,
  checkEmailExist,
  hashUserPassword,
  userLogin,
};

export default userService;

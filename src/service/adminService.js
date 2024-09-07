import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
import { where } from "sequelize/lib/sequelize";
import { name } from "ejs";
import { createJWT } from "../middleware/JWTAction";
import multer from "multer";
import path from "path";
const { sequelize } = db;

const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

const adminFetchAllUser = async () => {
  try {
    const listUser = await db.User.findAll();

    return {
      EM: "Get all successfully",
      EC: 0,
      DT: listUser,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
    };
  }
};

const adminService = {
  adminFetchAllUser,
};

export default adminService;

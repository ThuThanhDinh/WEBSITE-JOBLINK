import adminService from "../service/adminService";
import multer from "multer";
import path from "path";

import CV from "../models";
var appRoot = require("app-root-path");
const fs = require("fs");
import db from "../models/index";

const handleFetchAllUser = async (req, res) => {
  try {
    // Call the create function in the service
    let data = await adminService.adminFetchAllUser();

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error during CV creation:", error);
    return res.status(500).json({
      EM: "Unknown error occurred",
      EC: "-1",
      DT: "",
    });
  }
};
const adminController = {
  handleFetchAllUser,
};

export default adminController;

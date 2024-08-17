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
      userType: "applicant",
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
    // Kiểm tra xem email có tồn tại không
    let user = await db.User.findOne({
      where: { email: userData.email },
    });

    if (!user) {
      return {
        EM: "The email does not exist",
        EC: 1,
      };
    }

    // So sánh mật khẩu được cung cấp với mật khẩu đã được băm lưu trữ
    const isPasswordValid = bcrypt.compareSync(
      userData.password,
      user.password
    );

    if (isPasswordValid) {
      // Tạo payload cho JWT
      let payload = {
        email: user.email,
        fullName: user.fullName, // Thêm fullName vào payload
        expiresIn: process.env.JWT_EXPIRES_IN,
      };

      // Tạo JWT token
      let token = createJWT(payload);

      // Trả về thông tin đăng nhập thành công cùng với access_token và thông tin người dùng
      return {
        EM: "Login successfully",
        EC: 0,
        DT: {
          access_token: token,
          user: {
            fullName: user.fullName, // Hoặc bất kỳ thông tin người dùng nào bạn muốn gửi
            email: user.email,
            phoneNumber: user.phoneNumber,
            imageFile: user.imageFile,
            id: user.id,
            // Thêm các thông tin khác nếu cần
          },
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

const userProfileUpdate = async (userData) => {
  try {
    let user = await db.User.findOne({
      where: { email: userData.email },
    });

    if (!user) {
      return {
        EM: "The email does not exist",
        EC: 1,
      };
    }

    // Update user information
    user.fullName = userData.fullName;
    user.phoneNumber = userData.phoneNumber;

    // Update image file name in the database
    if (userData.imageFile) {
      user.imageFile = userData.imageFile; // Save only the filename, not the full path
    }

    await user.save(); // Save changes to the database

    // Construct the full image URL
    //const fullImageUrl = `${process.env.SERVER_URL}/image/${user.imageFile}`;

    return {
      EM: "Profile updated successfully",
      EC: 0,
      DT: {
        user: {
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          imageFile: user.imageFile, // Return the full URL of the image
          id: user.id,
        },
      },
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
    };
  }
};

const userCreateCV = async (userData) => {
  console.log("check", userData);
  try {
    const newCV = await db.CV.create({
      userId: userData.userId,
      nameCV: userData.nameCV,
      CVFile: userData.CVFile,
      isDefault: userData.isDefault,
    });

    return {
      EM: "create successfully",
      EC: 0,
      DT: {
        user: {
          cvId: newCV.id,
          userId: newCV.userId,
          nameCV: newCV.nameCV,
          CVFile: newCV.CVFile,
          isDefault: newCV.isDefault,
        },
      },
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
    };
  }
};

const userUpdateNotDefaultCV = async (userId) => {
  try {
    const data = await db.CV.update(
      { isDefault: false }, // Set isDefault to false
      { where: { userId } } // Where userId matches
    );

    return {
      EM: "Updated all CVs to not default",
      EC: 0,
      DT: {
        user: {
          cvId: data.id,
          userId: data.userId,
          nameCV: data.nameCV,
          CVFile: data.CVFile,
          isDefault: data.isDefault,
        },
      },
    };
  } catch (error) {
    console.error("Error setting all CVs to not default:", error);
    return {
      EM: "Error occurred while updating CVs",
      EC: -1,
      DT: "",
    };
  }
};

const userFetchAllCVByUserId = async (userId) => {
  try {
    const cvs = await db.CV.findAll({
      where: { userId: userId },
    });

    // Map through the array of CVs and return the necessary information
    const cvData = cvs.map((cv) => ({
      cvId: cv.id,
      userId: cv.userId,
      nameCV: cv.nameCV,
      CVFile: cv.CVFile,
      isDefault: cv.isDefault,
    }));

    return {
      EM: "Get all successfully",
      EC: 0,
      DT: cvData,
    };
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
  userProfileUpdate,
  userCreateCV,
  userUpdateNotDefaultCV,
  userFetchAllCVByUserId,
};

export default userService;

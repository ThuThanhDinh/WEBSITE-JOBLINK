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

const createNewRecruiter = async (userData) => {
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
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
      companyName: userData.companyName,
      workplace: userData.workplace,
      address: userData.address,
      userType: "employer",
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

const recruiterCreateJob = async (jobData) => {
  try {
    const data = await db.Job.create({
      jobTitle: jobData.jobTitle,
      level: jobData.level,
      jobType: jobData.jobType,
      address: jobData.address,
      description: jobData.description,
      minSalary: jobData.minSalary,
      maxSalary: jobData.maxSalary,
      skills: jobData.skills,
      jobRequirements: jobData.jobRequirements,
      employerId: jobData.employerId,
      companyLogo: jobData.companyLogo,
      companyName: jobData.companyName,
      companyDetail: jobData.companyDetail,
    });

    return {
      EM: "Create job successfully",
      EC: 0,

      DT: {
        recruiter: {
          jobTitle: data.jobTitle,
          level: data.level,
          jobType: data.jobType,
          address: data.address,
          description: data.description,
          minSalary: data.minSalary,
          maxSalary: data.maxSalary,
          skills: data.skills,
          jobRequirements: data.jobRequirements,
          employerId: data.employerId,
          companyLogo: data.companyLogo,
          companyName: data.companyName,
          companyDetail: data.companyDetail,
        },
      },
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrongs in service",
      EC: -2,
    };
  }
};

const recruiterFetchAllJobByRecruiterId = async (userId) => {
  try {
    const jobs = await db.Job.findAll({
      where: { employerId: userId },
    });

    // Map through the array of CVs and return the necessary information
    const jobData = jobs.map((job) => ({
      jobId: job.id,
      jobTitle: job.jobTitle,
      level: job.level,
      jobType: job.jobType,
      address: job.address,
      description: job.description,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      skills: job.skills,
      jobRequirements: job.jobRequirements,
      employerId: job.employerId,
      companyLogo: job.companyLogo,
      companyName: job.companyName,
      companyDetail: job.companyDetail,
    }));

    return {
      EM: "Get all successfully",
      EC: 0,
      DT: jobData,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
    };
  }
};

const recruiterFetchAllJob = async () => {
  try {
    const listJob = await db.Job.findAll();

    return {
      EM: "Get all successfully",
      EC: 0,
      DT: listJob,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
    };
  }
};

const recruiterFetchAllApplicationByRecruiterId = async (employerId) => {
  try {
    // Lấy tất cả các đơn ứng tuyển liên quan đến employerId
    const applications = await db.Application.findAll({
      include: [
        {
          model: db.Job,
          as: "job",
          where: { employerId: employerId }, // Điều kiện lấy công việc của employerId
        },
        {
          model: db.User,
          as: "applicant", // Lấy thông tin ứng viên
          attributes: ["email", "fullName"], // Lấy thông tin email và tên từ User
        },
        {
          model: db.CV,
          as: "cv", // Liên kết với bảng CV để lấy thông tin CV
          attributes: ["CVFile"], // Lấy tên file CV từ bảng CV
        },
      ],
    });

    console.log("applications", applications);
    // Map qua danh sách đơn ứng tuyển và lấy thông tin cần thiết
    const applicationData = applications.map((application) => ({
      jobTitle: application.job?.jobTitle, // Tiêu đề công việc
      level: application.job?.level, // Cấp độ công việc
      email: application.applicant?.email, // Email của ứng viên
      fullName: application.applicant?.fullName, // Tên ứng viên
      status: application.status, // Trạng thái đơn ứng tuyển
      CVFile: application.cv?.CVFile || null, // Lấy file CV từ bảng CV, nếu có
      applicationId: application.id, // ID của đơn ứng tuyển
      jobId: application.job?.id, // ID của công việc
    }));

    return {
      EM: "Get all applications successfully",
      EC: 0,
      DT: applicationData, // Dữ liệu trả về
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in the service",
      EC: -2,
    };
  }
};

const recruiterService = {
  createNewRecruiter,
  checkEmailExist,
  hashUserPassword,
  recruiterCreateJob,
  recruiterFetchAllJobByRecruiterId,
  recruiterFetchAllJob,
  recruiterFetchAllApplicationByRecruiterId,
};

export default recruiterService;

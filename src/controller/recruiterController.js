import recruiterService from "../service/recruiterService";
import multer from "multer";
import path from "path";

import CV from "../models";
var appRoot = require("app-root-path");
const fs = require("fs");
import db from "../models/index";

const handleCreateNewRecruiter = async (req, res) => {
  try {
    if (
      !req.body.fullName ||
      !req.body.email ||
      !req.body.password ||
      !req.body.gender ||
      !req.body.phoneNumber ||
      !req.body.companyName ||
      !req.body.workplace ||
      !req.body.address
    ) {
      return res.status(200).json({
        EM: "Missing required paramater",
        EC: "1",
        DT: "",
      });
    }

    let data = await recruiterService.createNewRecruiter(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleCreateNewJob = async (req, res) => {
  // Prepare data for creating a new CV
  const jobData = {
    jobTitle: req.body.jobTitle,
    level: req.body.level,
    jobType: req.body.jobType,
    address: req.body.address,
    description: req.body.description,
    minSalary: req.body.minSalary,
    maxSalary: req.body.maxSalary,
    skills: req.body.skills,
    jobRequirements: req.body.jobRequirements,
    employerId: req.body.employerId,
  };

  try {
    // Call the create function in the service
    let data = await recruiterService.recruiterCreateJob(jobData);

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

const handleFetchAllJobByRecruiterId = async (req, res) => {
  const userId = req.query.userId;
  try {
    // Call the create function in the service
    let data = await recruiterService.recruiterFetchAllJobByRecruiterId(userId);

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
const recruiterController = {
  handleCreateNewRecruiter,
  handleCreateNewJob,
  handleFetchAllJobByRecruiterId,
};

export default recruiterController;

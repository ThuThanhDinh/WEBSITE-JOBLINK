import userService from "../service/userService";
import multer from "multer";
import path from "path";

import CV from "../models";
var appRoot = require("app-root-path");
const fs = require("fs");
import db from "../models/index";
const handleCreateNewUser = async (req, res) => {
  try {
    if (!req.body.fullName || !req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required paramater",
        EC: "1",
        DT: "",
      });
    }

    let data = await userService.createNewUser(req.body);

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

const handleUserLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required paramater",
        EC: "1",
        DT: "",
      });
    }

    let data = await userService.userLogin(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination for uploaded files
    const uploadDir = appRoot + "/src/public/image";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Image file filter to allow only specific file types
const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter }).single(
  "imageFile"
);

const handleUserProfileUpdate = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({
        EM: "File upload failed",
        EC: "-1",
        DT: "",
      });
    }

    // Check for required parameters
    if (!req.body.fullName || !req.body.phoneNumber || !req.body.email) {
      return res.status(400).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    // Prepare data for updating
    const userData = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      imageFile: req.file ? req.file.filename : null, // Use the filename of the uploaded file
    };

    console.log("Check imageFile", userData.imageFile);

    // Call the update function in the service
    let data = await userService.userProfileUpdate(userData);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  });
};

const storageCV = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination for uploaded files
    const uploadDir = appRoot + "/src/public/fileCV";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// PDF file filter to allow only PDF files
const CVFileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(pdf|PDF)$/)) {
    req.fileValidationError = "Only PDF files are allowed!";
    return cb(new Error("Only PDF files are allowed!"), false);
  }
  cb(null, true);
};

let uploadCVFile = multer({
  storage: storageCV,
  fileFilter: CVFileFilter,
}).single("CVFile");

const handleCreateCV = async (req, res) => {
  uploadCVFile(req, res, async function (err) {
    if (err) {
      console.error("Error during file upload:", err);
      return res.status(500).json({
        EM: "File upload failed",
        EC: "-1",
        DT: "",
      });
    }
    console.log(
      "check req.body",
      req.body.id,
      req.body.nameCV,
      req.file.filename,
      req.body.isDefault
    );
    // Check for required parameters
    if (!req.body.nameCV || !req.file) {
      console.error("Missing required parameters:", {
        nameCV: req.body.nameCV,
        file: req.file,
      });
      return res.status(400).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    // Prepare data for creating a new CV
    const userData = {
      userId: req.body.id,
      nameCV: req.body.nameCV,
      CVFile: req.file.filename,
      isDefault: req.body.isDefault,
    };

    console.log("Check CVFile", userData.CVFile);

    try {
      // Call the create function in the service
      let data = await userService.userCreateCV(userData);

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
  });
};

const handleUpdateNotDefaultCV = async (req, res) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const { userId } = req.body;

    if (!userId) {
      console.error("Missing required parameters:", { userId });
      return res.status(400).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    // Call the service function to update the default CV
    const result = await userService.userUpdateNotDefaultCV(userId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error during default CV update:", error);
    return res.status(500).json({
      EM: "Unknown error occurred",
      EC: "-1",
      DT: "",
    });
  }
};

const handleFetchAllCVByUserId = async (req, res) => {
  const userId = req.query.userId;
  try {
    // Call the create function in the service
    let data = await userService.userFetchAllCVByUserId(userId);

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

const handleSetDefaultCV = async (req, res) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const { userId, cvId } = req.body;

    if (!userId || !cvId) {
      console.error("Missing required parameters:", { userId, cvId });
      return res.status(400).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }

    // Call the service function to update the default CV
    const result = await userService.userSetDefaultCV(userId, cvId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error during default CV update:", error);
    return res.status(500).json({
      EM: "Unknown error occurred",
      EC: "-1",
      DT: "",
    });
  }
};

const handleCreateApplication = async (req, res) => {
  // Prepare data for creating a new CV
  const userData = {
    jobId: req.body.jobId,
    applicantId: req.body.applicantId,
    cvId: req.body.cvId,
  };
  console.log("dhjdhfuddaaaa", userData);
  try {
    // Call the create function in the service
    let data = await userService.userCreateApplication(userData);

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

const apiController = {
  handleCreateNewUser,
  handleUserLogin,
  handleUserProfileUpdate,
  handleCreateCV,
  handleUpdateNotDefaultCV,
  handleFetchAllCVByUserId,
  handleSetDefaultCV,
  handleCreateApplication,
};

export default apiController;

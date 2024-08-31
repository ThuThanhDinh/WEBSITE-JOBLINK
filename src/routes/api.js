import { removeUnnecessaryItems } from "@babel/preset-env/lib/filter-items";
import express from "express";
// import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import recruiterController from "../controller/recruiterController";
import { checkUserJWT } from "../middleware/JWTAction";
//const apiController = require("../controller/apiController");
const router = express.Router();

/**
 *
 *
 *  @param {*} app - express app
 */

const initApiRoutes = (app) => {
  router.all("*", checkUserJWT);
  router.post("/applicant/sign-up", apiController.handleCreateNewUser);
  router.post("/applicant/login", apiController.handleUserLogin);
  router.post(
    "/applicant/profile-update",
    apiController.handleUserProfileUpdate
  );

  router.post("/applicant/create-cv", apiController.handleCreateCV);
  router.post(
    "/applicant/update-not-default-cv",
    apiController.handleUpdateNotDefaultCV
  );

  router.get(
    "/applicant/fetch-all-cv-by-userid",
    apiController.handleFetchAllCVByUserId
  );

  router.post("/applicant/set-default-cv", apiController.handleSetDefaultCV);

  router.post(
    "/applicant/create-application",
    apiController.handleCreateApplication
  );

  router.post(
    "/recruiter/sign-up",
    recruiterController.handleCreateNewRecruiter
  );

  router.post("/recruiter/add-job", recruiterController.handleCreateNewJob);

  router.get(
    "/recruiter/fetch-all-job-by-recruiterid",
    recruiterController.handleFetchAllJobByRecruiterId
  );

  router.get("/recruiter/fetch-all-job", recruiterController.handleFetchAllJob);
  // router.post("/users/login", apiController.handleLogin)
  // router.post("/doctors/send-blood-request", apiController.handleSendBoodRequest)
  // router.get("/admin/get-all-request", apiController.handleAllRequest)
  // router.get("/get-all-blood-bank", apiController.handleAllBloodBank)
  // router.post("/create-book-donation", apiController.handleBookDonation)
  // router.get("/get-all-donation-schedule", apiController.handleAllDonationScheduleByHospitalId)
  // router.get("/get-all-donor-by-hospitalId", apiController.handleAllDonorByHospitalId)
  // router.get("/get-notification-by-donorid", apiController.handleNotificationByDonorId)
  // router.get("/get-all-history-by-donorId", apiController.handleAllHistoryByDonorId)
  // router.post("/create-donor-infor", apiController.handleCreateDonorInfor)
  // router.get("/admin/get-donor-infor", apiController.handleAllDonorInfor)
  // router.delete("/delete-request", apiController.handleDeleteRequest)
  //   router.post(
  //     "/request-blood-from-admin",
  //     apiController.handleRequestBloodFromAdmin
  //   );
  // router.post("/api/users/create-profile-user", homeController.handleCreateNewProfileUser)
  // router.post("/delete-user/:id", homeController.handleDeleteUser)
  // router.post("/update-user/:id", homeController.handleUpdateUser)

  //router.get("/testapi", apiController.testApi);

  return app.use("/api/", router);
};
export default initApiRoutes;

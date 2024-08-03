import { removeUnnecessaryItems } from "@babel/preset-env/lib/filter-items";
import express from "express";
// import homeController from "../controller/homeController";
// import apiController from "../controller/apiController";
const router = express.Router();

/**
 *
 *
 *  @param {*} app - express app
 */

const initWebRoutes = (app) => {
  //   router.get("/", homeController.handleHelloWorld);
  //   router.get("/user", homeController.handleUser);
  //   //router.post("/api/users/create-new-user", homeController.handleCreateNewUser)
  //   router.post(
  //     "/api/users/create-profile-user",
  //     homeController.handleCreateNewProfileUser
  //   );
  // router.post("/delete-user/:id", homeController.handleDeleteUser)
  // router.post("/update-user/:id", homeController.handleUpdateUser)

  //   router.get("/testapi", apiController.testApi);

  return app.use("/", router);
};
export default initWebRoutes;

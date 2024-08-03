import userService from "../service/userService";

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

const apiController = {
  handleCreateNewUser,
  handleUserLogin,
};

export default apiController;

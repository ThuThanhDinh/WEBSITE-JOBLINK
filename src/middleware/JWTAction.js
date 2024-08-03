// @ts-nocheck
require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  // let payload = { name: 'thanh', address: 'hcm' };
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    //console.log(token)
  } catch (err) {
    console.log(err);
  }

  return token;
};

const nonSecurePaths = ["/applicant/sign-up", "/applicant/login"];
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;

  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (err) {
    console.log(err);
  }
  return data;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Sửa lại thành split(' ')[0]
    return req.headers.authorization.split(" ")[1]; // Sửa lại thành split(' ')[1]
  }

  return null;
};
const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let tokenFromHeader = extractToken(req);
  console.log("check token", tokenFromHeader);
  if (tokenFromHeader) {
    let token = tokenFromHeader;

    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

export { createJWT, verifyToken, checkUserJWT };

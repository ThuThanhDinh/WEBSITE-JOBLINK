import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import cors from "cors";
import configCors from "./config/cors";
import path from "path";
//var cookieParser = require('cookie-parser')
//import cookieParser from "cookie-parser";

import { createJWT, verifyToken } from "./middleware/JWTAction";

const app = express();
const PORT = process.env.PORT || 8080;

configCors(app);

//
app.use(cors());

//config view engine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
connection();
//init web routes

//createJWT();
// let decodedData = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGhhbmgiLCJhZGRyZXNzIjoiaGNtIiwiaWF0IjoxNzE2OTY0Mjg2fQ.ig46A6Ya-u_tS1Wxo5DvaotznS6XDIM-zTiGENncA_I')
// console.log(decodedData)

//config cookie parser

initWebRoutes(app);
initApiRoutes(app);
app.use("/image", express.static(path.join(__dirname, "public/image")));
app.use("/fileCV", express.static(path.join(__dirname, "public/fileCV")));

app.use((req, res) => {
  return res.send("404 not found");
});

//console.log("PORT from .env:", process.env.PORT);

app.listen(PORT, () => {
  console.log("listen on the port " + PORT);
});

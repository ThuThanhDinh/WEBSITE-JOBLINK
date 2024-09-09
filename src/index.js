import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import Companies from "./Components/companies/Companies";
import Blog from "./Components/Blog/general/general";
import Detail from "./Components/Blog/detail/detail";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux"; // Import Provider từ react-redux
//import store from "./store"; // Import store từ file store.js
import Profile from "./Components/Profile/Profile";
import MyProfile from "./Components/Profile/MyProfile/MyProfile";
import AddCV from "./Components/Profile/AddCV/AddCV";
import ManageCV from "./Components/Profile/ManageCV/ManageCV";
import ManageApplication from "./Components/Profile/ManageApplication/ManageApplication";
import Dashboard from "./Components/Profile/Dashboard/Dashboard";
import { store, persistor } from "./store"; // đường dẫ
import { PersistGate } from "redux-persist/integration/react";
import LoginRecruiter from "./Components/Recruiter/LoginRecruiter/LoginRecruiter";
import SignUpRecruiter from "./Components/Recruiter/SignUpRecruiter/SignUpRecruiter";
import Recruiter from "./Components/Recruiter/Recruiter";
import DashboardRecruiter from "./Components/Recruiter/DashboardRecruiter/DashboardRecruiter";
import AddJob from "./Components/Recruiter/AddJob/AddJob";
import ManageJob from "./Components/Recruiter/ManageJob/ManageJob";
import Job from "./Components/Job/Job";
import JobDetail from "./Components/Job/JobDetail/JobDetail";
import ManageCandidateApplication from "./Components/Recruiter/ManageCandidateApplication/ManageCandidateApplication";
import SendEmail from "./Components/Recruiter/ManageCandidateApplication/SendEmail/SendEmail";
import SignUpAdmin from "./Components/Admin/SignUp/SignUpAdmin";
import LoginAdmin from "./Components/Admin/Login/LoginAdmin";
import ManageUser from "./Components/Admin/ManageUser/ManageUser";
import ManageJobAdmin from "./Components/Admin/ManageJobAdmin/ManageJobAdmin";
import ManageBlog from "./Components/Admin/ManageBlog/ManageBlog";
import AddBlog from "./Components/Admin/AddBlog/AddBlog";
import DashboardAdmin from "./Components/Admin/DashboardAdmin/DashboardAdmin";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {" "}
          {/* Bọc ứng dụng với Provider */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="companies" element={<Companies />} />
                <Route path="job" element={<Job />} />
                <Route path="job-detail/:jobId" element={<JobDetail />} />
                <Route path="blog" element={<Blog />} />
                <Route path="detail" element={<Detail />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="login-recruiter" element={<LoginRecruiter />} />
                <Route path="sign-up-recruiter" element={<SignUpRecruiter />} />
                <Route path="admin-login" element={<LoginAdmin />} />
                <Route path="admin-sign-up" element={<SignUpAdmin />} />
              </Route>
              <Route path="/profile" element={<Profile />}>
                <Route index element={<Dashboard />} />
                <Route path="/profile/my-profile" element={<MyProfile />} />
                <Route path="/profile/add-cv" element={<AddCV />} />
                <Route path="/profile/manage-cv" element={<ManageCV />} />
                <Route
                  path="/profile/manage-application"
                  element={<ManageApplication />}
                />
              </Route>
              <Route path="/recruiter" element={<Recruiter />}>
                <Route index element={<DashboardRecruiter />} />
                <Route path="/recruiter/add-job" element={<AddJob />} />
                <Route path="/recruiter/manage-job" element={<ManageJob />} />
                <Route
                  path="/recruiter/manage-candidate-application"
                  element={<ManageCandidateApplication />}
                />
                <Route path="/recruiter/send-email" element={<SendEmail />} />
              </Route>
              <Route path="/admin" element={<Admin />}>
                <Route index element={<DashboardAdmin />} />
                <Route path="/admin/manage-user" element={<ManageUser />} />
                <Route path="/admin/manage-job" element={<ManageJobAdmin />} />
                <Route path="/admin/manage-blog" element={<ManageBlog />} />
                <Route path="/admin/add-blog" element={<AddBlog />} />
              </Route>
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
} else {
  console.error("Root element not found");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

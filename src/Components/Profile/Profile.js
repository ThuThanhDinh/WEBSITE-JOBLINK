//@ts-nocheck
import "./Profile.css";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <div className="flex flex-wrap bg-gray-100 w-full h-screen">
        <div className="w-2.5/12 bg-white rounded pl-0 pr-3 py-3 shadow-lg">
          <div className="flex items-center space-x-4 p-2 mb-5">
            <img
              className="h-12 rounded-full"
              src={`${process.env.REACT_APP_SERVER_URL}/image/${user.imageFile}`}
              alt="avatar"
            />
            <div>
              <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
                {user.fullName}
              </h4>
              <span className="text-sm tracking-wide flex items-center space-x-1">
                <svg
                  className="h-4 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-gray-600">Verified</span>
              </span>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline ${
                    isActive ? "active-link" : ""
                  }`
                }
              >
                <span className="text-gray-600">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/my-profile"
                className={({ isActive }) =>
                  `flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline ${
                    isActive ? "active-link" : ""
                  }`
                }
              >
                <span className="text-gray-600">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span>Thông tin cá nhân</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/add-cv"
                className={({ isActive }) =>
                  `flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline ${
                    isActive ? "active-link" : ""
                  }`
                }
              >
                <span className="text-gray-600">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </span>
                <span>Thêm CV</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/manage-cv"
                className={({ isActive }) =>
                  `flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline ${
                    isActive ? "active-link" : ""
                  }`
                }
              >
                <span className="text-gray-600">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </span>
                <span>Quản lý CV</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/manage-application"
                className={({ isActive }) =>
                  `flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline ${
                    isActive ? "active-link" : ""
                  }`
                }
              >
                <span className="text-gray-600">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </span>
                <span>Quản lý đơn ứng tuyển</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="w-9.5/12 flex justify-center items-center h-full">
          <div className="p-4 text-gray-500 w-full max-w-4xl flex justify-center items-center h-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

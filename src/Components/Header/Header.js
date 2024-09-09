//@ts-nocheck
import "./Header.css";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Lấy thông tin người dùng từ Redux state
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token && user) {
      // User is logged in
    } else {
      // User is not logged in
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleProfileRedirect = () => {
    if (user?.userType === "applicant") {
      navigate("/profile");
    } else if (user?.userType === "employer") {
      navigate("/recruiter");
    }
  };

  return (
    <div className="header-content">
      <div className="content-left">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : undefined)}
        >
          JOBLINKER
        </NavLink>
      </div>

      <div className="content-center">
        <NavLink
          to="/job"
          className={({ isActive }) => (isActive ? "active-link" : undefined)}
        >
          Việc làm
        </NavLink>
        <NavLink
          to="/companies"
          className={({ isActive }) => (isActive ? "active-link" : undefined)}
        >
          Top công ty
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? "active-link" : undefined)}
        >
          Blog
        </NavLink>
      </div>

      <div className="content-right">
        {user ? (
          <>
            <span className="user-name" onClick={handleProfileRedirect}>
              {user.fullName}
            </span>{" "}
            {/* Hiển thị tên người dùng */}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login-recruiter"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Nhà tuyển dụng
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Đăng nhập
            </NavLink>
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Đăng ký
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

// @ts-nocheck
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { postUserLogin } from "../../../Services/userService";
import { toast } from "react-toastify";
const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.user.user?.fullName);
  console.log("check", auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postUserLogin(email, password);
      console.log("LoginAdmin response:", res);
      if (res && res.EC === 0) {
        dispatch(loginSuccess(res.DT.user, res.DT.access_token));
        //localStorage.setItem("authToken", res.DT.access_token);
        toast.success(res.EM);
        // Navigate based on userType
        // if (res.DT.user.userType === "applicant") {
        //   navigate("/");
        // } else if (res.DT.user.userType === "employer") {
        //   navigate("/recruiter");
        // }

        navigate("/admin");
      } else {
        dispatch(loginFailure(res.EM));
        toast.error(res.EM);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng nhập tài khoản Admin
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button className="text-sm font-medium text-[#df4710] hover:underline dark:text-[#df4710]">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#df4710] hover:bg-[#bf3e0a] focus:ring-4 focus:outline-none focus:ring-[#df4710] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <button
                  type="button"
                  className="font-bold text-[#df4710] hover-underline dark:text-[#df4710]"
                  onClick={() => navigate("/admin-sign-up")}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginAdmin;

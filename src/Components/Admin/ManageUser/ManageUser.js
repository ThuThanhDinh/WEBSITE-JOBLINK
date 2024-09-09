// @ts-nocheck
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUser } from "../../../redux/actions/adminAction";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const listUser = useSelector((state) => state.admin.listUser);
  const loading = useSelector((state) => state.admin.loading);

  useEffect(() => {
    dispatch(fetchAllUser(token));
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-56 relative pt-15 mr-40">
      <h1 className=" text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white pb-[30px]">
        Quản lý ứng tuyển
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 pl-11">
                Tên tài khoản
              </th>

              <th scope="col" className="px-6 py-3 pl-11">
                Email
              </th>
              <th scope="col" className="px-6 py-3 pl-11">
                Số điện thoại
              </th>

              <th scope="col" className="px-6 py-3 pl-11">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listUser.length > 0 ? (
              listUser.map((user) => (
                <tr
                  key={user.id}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 ${
                    selectedRow === user.id ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="px-6 py-4">{user.fullName}</td>

                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>

                  <td className="px-6 py-4 pl-16">
                    <button
                      //   onClick={() => handleSendEmail(application.applicationId)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;

// @ts-nocheck
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchApplicationByUserId } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const ManageApplication = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  // Lấy danh sách ứng tuyển từ Redux
  const applications = useSelector(
    (state) => state.user.listApplicationByUserId
  );
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    if (user?.id && token) {
      dispatch(fetchApplicationByUserId(user.id, token));
    }
  }, [dispatch, user?.id, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative pt-15">
      <h1 className="ml-56 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white pb-[30px]">
        Quản lý đơn ứng tuyển
      </h1>
      <div className="ml-56 relative overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 pl-11">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3 pl-11">
                Level
              </th>

              <th scope="col" className="px-6 py-3 pl-11">
                Name Applicant
              </th>

              <th scope="col" className="px-6 py-3 pl-11">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((application) => (
                <tr
                  key={application.id}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 ${
                    selectedRow === application.id ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="px-6 py-4">{application.jobTitle}</td>
                  <td className="px-6 py-4">{application.level}</td>

                  <td className="px-6 py-4">{application.fullName}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => console.log("Trash icon clicked")}
                      className="text-red-600 hover:text-red-800 ml-2"
                      title="Delete Application"
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

export default ManageApplication;

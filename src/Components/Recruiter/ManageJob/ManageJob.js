// @ts-nocheck
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllJobsByRecruiterId } from "../../../redux/actions/recruiterAction";

import { useNavigate } from "react-router-dom";

const ManageJob = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const listJobByRecruiterId = useSelector(
    (state) => state.recruiter.listJobByRecruiterId
  );

  useEffect(() => {
    if (user?.id && token) {
      dispatch(fetchAllJobsByRecruiterId(user.id, token));
    }
  }, [dispatch, user?.id, token]);

  const handleStatusClick = async (jobId) => {
    setSelectedRow(jobId);
    try {
      // Implement status update logic here
    } catch (error) {
      console.error("Failed to update job status:", error);
    }
  };

  const handleEditClick = (jobId) => {
    // Implement job editing logic here
  };

  const handleDeleteClick = async (jobId) => {
    try {
      //await dispatch(deleteJob(jobId, token));
      dispatch(fetchAllJobsByRecruiterId(user.id, token));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const handleViewDetailsClick = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  return (
    <div className="relative pt-15">
      <h1 className=" ml-20 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white pb-[30px]">
        Your Jobs
      </h1>
      <div className="ml-20 relative overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
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
                Address
              </th>
              <th scope="col" className="px-6 py-3 pl-11">
                Status
              </th>
              <th scope="col" className="px-6 py-3 pl-11">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listJobByRecruiterId?.length > 0 ? (
              listJobByRecruiterId.map((item) => (
                <tr
                  key={item.jobId}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#ccc] dark:hover:bg-gray-600 min-h-[80px] ${
                    selectedRow === item.jobId ? "bg-gray-100" : ""
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.jobTitle}
                  </th>
                  <td className="px-6 py-4">{item.level}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-2 text-white rounded ${
                        item.isActive ? "bg-[#df4710]" : "bg-[#f0a890]"
                      } hover:bg-[#df4710]`}
                      onClick={() => handleStatusClick(item.jobId)}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEditClick(item.jobId)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 mr-2"
                      onClick={() => handleDeleteClick(item.jobId)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleViewDetailsClick(item.id)}
                    >
                      <i className="fas fa-info-circle"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJob;

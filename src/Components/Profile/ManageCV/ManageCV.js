// @ts-nocheck
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCVByUserId,
  setDefaultCV,
} from "../../../redux/actions/userAction";

const ManageCV = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const listCVByUserId = useSelector((state) => state.user.listCVByUserId);

  useEffect(() => {
    if (user?.id && token) {
      dispatch(fetchAllCVByUserId(user.id, token));
    }
  }, [dispatch, user?.id, token]);

  const handleStatusClick = async (cvId) => {
    setSelectedRow(cvId);
    try {
      await dispatch(setDefaultCV(user.id, cvId, token));
      dispatch(fetchAllCVByUserId(user.id, token));
    } catch (error) {
      console.error("Failed to update default CV:", error);
    }
  };

  const handleViewClick = (CVFile) => {
    const fileURL = `${process.env.REACT_APP_SERVER_URL}/fileCV/${CVFile}`;
    window.open(fileURL, "_blank"); // Mở liên kết trong tab hoặc cửa sổ mới
  };

  return (
    <div className="relative pt-15">
      <h1 className="pl-44 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white pb-[30px]">
        Your CV
      </h1>
      <div className="ml-44 relative overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 pl-11">
                Name CV
              </th>
              <th scope="col" className="px-6 py-3 pl-11">
                View
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
            {listCVByUserId?.length > 0 ? (
              listCVByUserId.map((item) => (
                <tr
                  key={item.cvId}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#ccc] dark:hover:bg-gray-600 min-h-[80px] ${
                    selectedRow === item.cvId ? "bg-gray-100" : ""
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.nameCV}
                  </th>
                  <td className="px-6 py-4">
                    <button
                      className="px-4 py-2 bg-[#df4710] text-white rounded hover:bg-[#bf3e0d]"
                      onClick={() => handleViewClick(item.CVFile)}
                    >
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-2 text-white rounded ${
                        item.isDefault ? "bg-[#df4710]" : "bg-[#f0a890]"
                      } hover:bg-[#df4710]`}
                      onClick={() => handleStatusClick(item.cvId)}
                    >
                      {item.isDefault ? "Default" : "Set as Default"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No CVs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCV;

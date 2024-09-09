// @ts-nocheck
import "./AddCV.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createCV,
  updateAllNotDefaultCV,
} from "../../../redux/actions/userAction";
import { postUpdateDefaultCV } from "../../../Services/userService";
const AddCV = () => {
  const [nameCV, setnameCV] = useState("");
  const [CVFile, setCVFile] = useState(null);
  const [CVPreview, setCVPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const handlenameCVChange = (e) => setnameCV(e.target.value);

  const handleCVFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setCVFile(selectedFile);
      setCVPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please select a PDF file.");
      setCVFile(null);
      setCVPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Token is missing. Please log in again.");
      return;
    }
    setShowModal(true);
  };

  const handleModalConfirm = async (isDefault) => {
    setShowModal(false);
    const userId = user.id;

    try {
      if (isDefault) {
        // Gửi yêu cầu cập nhật tất cả các CV khác
        dispatch(updateAllNotDefaultCV(userId, token));
        //await postUpdateDefaultCV(userId, token);
      }
      // Tiếp tục thực hiện việc tạo CV mới
      const result = await dispatch(
        createCV(user.id, nameCV, CVFile, token, isDefault)
      );
      if (result.success) {
        setnameCV("");
        setCVFile(null);
        setCVPreview("");
      } else {
        alert("Failed to create CV. Please try again.");
      }
    } catch (error) {
      alert("Failed to update CV. Please try again.");
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <section className="ml-72 bg-gray-50 dark:bg-gray-900 min-h-screen pt-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add Your CV
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="w-full">
                <label
                  htmlFor="nameCV"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  CV Name
                </label>
                <input
                  type="text"
                  name="nameCV"
                  id="nameCV"
                  value={nameCV}
                  onChange={handlenameCVChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="user_avatar"
                >
                  Upload Your CV (PDF only)
                </label>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="user_avatar"
                    className="custom-file-upload bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2.5 cursor-pointer"
                    style={{ flex: 1 }}
                  >
                    Choose file
                    <input
                      id="user_avatar"
                      type="file"
                      accept="application/pdf"
                      aria-describedby="user_avatar_help"
                      onChange={handleCVFileChange}
                      className="input-full-width"
                    />
                  </label>
                  <input
                    type="text"
                    placeholder={CVFile ? CVFile.name : "No file chosen"}
                    readOnly
                    className="input-full-width bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {CVPreview && (
                  <embed
                    src={CVPreview}
                    type="application/pdf"
                    width="100%"
                    className="embed-preview"
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#df4710] hover:bg-[#bf3e0a] focus:ring-4 focus:outline-none focus:ring-[#df4710] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <>
          {/* Modal Overlay */}
          <div className="modal-overlay" onClick={handleModalCancel} />

          {/* Modal Content */}
          <div className="ml-60 fixed inset-0 flex items-center justify-center z-50">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 modal-content">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Set CV as Default?
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleModalCancel}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Do you want to set this CV as your default?
                </p>
              </div>
              <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="modal-button-yes text-white hover:bg-[#bf3e0a] focus:ring-4 focus:outline-none focus:ring-[#df4710] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleModalConfirm(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 rounded-lg text-sm px-5 py-2.5 ms-3"
                  onClick={() => handleModalConfirm(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AddCV;

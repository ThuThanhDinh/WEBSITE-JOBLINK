// @ts-nocheck
import "./MyProfile.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfileSuccess,
  updateProfileFailure,
} from "../../../redux/actions/userAction";
import { postProfileUpdate } from "../../../Services/userService";
import _ from "lodash";
import { updateProfile } from "../../../redux/actions/userAction";
import { toast } from "react-toastify";
const MyProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const token = useSelector((state) => state.user.token);

  console.log("User from Redux store:", user);
  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImageFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      // Handle the case where the selected file is not an image
      toast.error("Please select an image file.");
      setImageFile(null);
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Token is missing. Please log in again.");
      return;
    }

    dispatch(updateProfile(fullName, phoneNumber, email, imageFile, token));
  };
  // Here you can handle the form submission, for example, sending the data to an API
  //     console.log("Form submitted with:", {
  //   fullName,
  //   email,
  //   phoneNumber,
  //   imageFile,
  //   token,
  //     });

  //     try {
  //       const res = await postProfileUpdate(
  //         fullName,
  //         phoneNumber,
  //         email,
  //         imageFile,
  //         token
  //       );

  //       console.log("update response:", res);
  //       if (res && res.EC === 0) {
  //         dispatch(updateProfileSuccess(res.DT.user));
  //         alert(res.EM);
  //       } else {
  //         dispatch(updateProfileFailure(res.EM));
  //         alert(res.EM);
  //       }
  //     } catch (error) {
  //       dispatch(updateProfileFailure(error.message));
  //       alert(`Error: ${error.message}`);
  //     }
  //   };

  useEffect(() => {
    if (user && !_.isEmpty(user)) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setImageFile(user.imageFile || ""); // Nếu user.imageFile là URL hoặc đường dẫn
      if (user && user.imageFile) {
        // Kiểm tra xem user và user.imageFile tồn tại
        const fullImageUrl = `${process.env.REACT_APP_SERVER_URL}/image/${user.imageFile}`;

        setImagePreview(fullImageUrl); // Cập nhật preview ảnh
      }
    }
  }, [user]);

  return (
    <section className=" ml-44 bg-gray-50 dark:bg-gray-900 min-h-screen  ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
        <div className="w-full max-w-7xl bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update your profile
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              enctype="multipart/form-data"
            >
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1 min-w-[250px]">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={handleFullNameChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex-1 min-w-[250px]">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
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
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1 min-w-[250px]">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="user_avatar"
                >
                  Upload Your Image
                </label>
                <div className="file-upload-wrapper">
                  <label htmlFor="user_avatar" className="custom-file-upload">
                    Choose file
                  </label>
                  <input
                    id="user_avatar"
                    type="file"
                    accept="image/*"
                    aria-describedby="user_avatar_help"
                    onChange={handleImageFileChange}
                  />
                  <input
                    type="text"
                    placeholder={imageFile ? imageFile.name : "No file chosen"}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 max-w-xs h-auto rounded-lg border border-gray-300 dark:border-gray-600"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#df4710] hover:bg-[#bf3e0a] focus:ring-4 focus:outline-none focus:ring-[#df4710] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;

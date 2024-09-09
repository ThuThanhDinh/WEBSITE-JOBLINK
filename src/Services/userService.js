import axios from "../utils/axiosCustomize";

const postCreateNewUser = (fullName, email, password) => {
  console.log("hello");
  //submit data
  return axios.post("/api/applicant/sign-up", {
    fullName: fullName,
    email: email,
    password: password,
  });
};

const postCreateNewRecruiter = (data) => {
  console.log("hello");
  //submit data
  return axios.post("/api/recruiter/sign-up", {
    fullName: data.fullName,
    email: data.fullName,
    password: data.password,
    gender: data.gender,
    phoneNumber: data.phoneNumber,
    companyName: data.companyName,
    workplace: data.workplace,
    address: data.address,
  });
};

const postUserLogin = (email, password) => {
  //submit data
  return axios.post("/api/applicant/login", {
    email: email,
    password: password,
  });
};

const postProfileUpdate = (fullName, phoneNumber, email, imageFile, token) => {
  // Tạo đối tượng FormData
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("phoneNumber", phoneNumber);
  formData.append("email", email);
  formData.append("imageFile", imageFile); // 'imageFile' phải là đối tượng File (như từ input type="file")
  console.log("email", email);
  return axios.post("/api/applicant/profile-update", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Đặt Content-Type để Axios hiểu đây là multipart/form-data
      Authorization: `Bearer ${token}`, // Bao gồm token trong headers
    },
  });
};

const postCreateCV = (id, nameCV, CVFile, token, isDefault) => {
  console.log("check upload file pdf1", id, nameCV, CVFile, token, isDefault);

  const formData = new FormData();
  formData.append("id", id);
  formData.append("nameCV", nameCV);

  // Kiểm tra kiểu dữ liệu của CVFile
  if (CVFile instanceof File) {
    formData.append("CVFile", CVFile);
  } else {
    console.error("CVFile is not a valid File object");
  }

  formData.append("isDefault", isDefault);

  // Kiểm tra nội dung của formData
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  return axios.post("/api/applicant/create-cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const postUpdateNotDefaultCV = (userId, token) => {
  // Prepare the data to be sent
  const data = { userId };
  console.log("dataupdatedefaiult", data);
  // Submit data
  return axios.post("/api/applicant/update-not-default-cv", data, {
    headers: {
      "Content-Type": "application/json", // Change to application/json if sending JSON data
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllCVByUserId = (userId, token) => {
  // Submit data
  return axios.get(`/api/applicant/fetch-all-cv-by-userid`, {
    headers: {
      "Content-Type": "application/json", // Use application/json
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId: userId, // Pass userId as a query parameter
    },
  });
};

const postSetDefaultCV = (userId, cvId, token) => {
  // Prepare the data to be sent
  const data = { userId, cvId };
  console.log("dataupdatedefaiult", data);
  // Submit data
  return axios.post("/api/applicant/set-default-cv", data, {
    headers: {
      "Content-Type": "application/json", // Change to application/json if sending JSON data
      Authorization: `Bearer ${token}`,
    },
  });
};

const postCreateApplication = (data, token) => {
  const application = {
    jobId: data.jobId,
    applicantId: data.applicantId,
    cvId: data.cvId,
  };

  console.log("sjsvhadhfd alidodid", application);
  return axios.post("/api/applicant/create-application", application, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllBySearch = async ({ city, keyword }) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/jobs/search?city=${city}&keyword=${keyword}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const getAllApplicationByUserId = (userId, token) => {
  // Submit data
  return axios.get(`/api/applicant/fetch-all-application-by-userid`, {
    headers: {
      "Content-Type": "application/json", // Use application/json
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId: userId, // Pass userId as a query parameter
    },
  });
};

export {
  postCreateNewUser,
  postUserLogin,
  postProfileUpdate,
  postCreateCV,
  postUpdateNotDefaultCV,
  getAllCVByUserId,
  postSetDefaultCV,
  postCreateNewRecruiter,
  postCreateApplication,
  getAllBySearch,
  getAllApplicationByUserId,
};

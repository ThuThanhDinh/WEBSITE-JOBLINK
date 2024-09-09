import axios from "../utils/axiosCustomize";

const postCreateNewRecruiter = (data) => {
  console.log("hello");
  //submit data
  return axios.post("/api/recruiter/sign-up", {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
    gender: data.gender,
    phoneNumber: data.phoneNumber,
    companyName: data.companyName,
    workplace: data.workplace,
    address: data.address,
  });
};

const postCreateNewJob = (data, token) => {
  const job = {
    jobTitle: data.jobTitle,
    level: data.level,
    jobType: data.jobType,
    address: data.address,
    description: data.description,
    minSalary: data.minSalary,
    maxSalary: data.maxSalary,
    skills: data.skills,
    jobRequirements: data.jobRequirements,
    employerId: data.employerId,
    companyLogo: data.companyLogo,
    companyName: data.companyName,
    companyDetail: data.companyDetail,
  };
  console.log("hello");
  //submit data
  return axios.post("/api/recruiter/add-job", job, {
    headers: {
      "Content-Type": "application/json", // Change to application/json if sending JSON data
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllCVByRecruiterId = (userId, token) => {
  // Submit data
  return axios.get(`/api/recruiter/fetch-all-job-by-recruiterid`, {
    headers: {
      "Content-Type": "application/json", // Use application/json
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId: userId, // Pass userId as a query parameter
    },
  });
};

const getAllJob = (token) => {
  // Submit data
  return axios.get(`/api/recruiter/fetch-all-job`, {
    headers: {
      "Content-Type": "application/json", // Use application/json
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllApplicationByRecruiterId = (employerId, token) => {
  return axios.get(`/api/recruiter/fetch-all-application-by-recruiter-id`, {
    params: { employerId }, // Pass employerId as a query parameter
    headers: {
      "Content-Type": "application/json", // Use application/json
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  postCreateNewRecruiter,
  postCreateNewJob,
  getAllCVByRecruiterId,
  getAllJob,
  getAllApplicationByRecruiterId,
};

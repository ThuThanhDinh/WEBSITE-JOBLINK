import axios from "../utils/axiosCustomize";

const getAllUser = (token) => {
  // Submit data
  return axios.get(`/api/admin/fetch-all-user`, {
    headers: {
      "Content-Type": "application/json", // Use application/json
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getAllUser };

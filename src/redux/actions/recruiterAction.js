// @ts-nocheck
// userAction.js
import actionTypes from "./actionType";
import { toast } from "react-toastify";
import {
  postCreateNewJob,
  getAllCVByRecruiterId,
  getAllJob,
  getAllApplicationByRecruiterId,
} from "../../Services/recruiterService";

export const createJob = (data, token) => {
  return async (dispatch) => {
    dispatch(createJobRequest());
    try {
      const res = await postCreateNewJob(data, token);
      console.log("check res", res);

      // Kiểm tra phản hồi từ API trước khi sử dụng các thuộc tính
      if (res && res.EC === 0) {
        dispatch(createJobSuccess(res.DT.recruiter));
        toast.success(res.EM);
        return { success: true };
      } else if (res && res.EM) {
        dispatch(createJobFailure(res.EM));
        toast.error(res.EM);
      } else {
        dispatch(createJobFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(createJobFailure(error.message));
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const createJobRequest = () => ({
  type: actionTypes.CREATE_JOB_REQUEST,
});

export const createJobSuccess = (user) => ({
  type: actionTypes.CREATE_JOB_SUCCESS,
  payload: user,
});

export const createJobFailure = (error) => ({
  type: actionTypes.CREATE_JOB_FAILURE,
  payload: error,
});

export const fetchAllJobsByRecruiterId = (userId, token) => {
  return async (dispatch) => {
    dispatch(fetchAllJobsByRecruiterIdRequest());
    try {
      const res = await getAllCVByRecruiterId(userId, token);

      // Check the API response before using its properties
      if (res && res.EC === 0) {
        dispatch(fetchAllJobsByRecruiterIdSuccess(res.DT)); // Use the mapped data
        return { success: true };
      } else if (res && res.EM) {
        dispatch(fetchAllJobsByRecruiterIdFailure(res.EM));
      } else {
        dispatch(fetchAllJobsByRecruiterIdFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(fetchAllJobsByRecruiterIdFailure(error.message)); // Correct action here
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const fetchAllJobsByRecruiterIdRequest = () => ({
  type: actionTypes.FETCH_ALL_JOB_BY_RECRUITER_ID_REQUEST,
});

export const fetchAllJobsByRecruiterIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_JOB_BY_RECRUITER_ID_SUCCESS,
  payload: data,
});

export const fetchAllJobsByRecruiterIdFailure = (error) => ({
  type: actionTypes.FETCH_ALL_JOB_BY_RECRUITER_ID_FAILURE,
  payload: error,
});

export const fetchAllJob = (token) => {
  return async (dispatch) => {
    dispatch(fetchAllJobRequest());
    try {
      const res = await getAllJob(token);

      // Check the API response before using its properties
      if (res && res.EC === 0) {
        dispatch(fetchAllJobSuccess(res.DT)); // Use the mapped data
        return { success: true };
      } else if (res && res.EM) {
        dispatch(fetchAllJobFailure(res.EM));
      } else {
        dispatch(fetchAllJobFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(fetchAllJobFailure(error.message)); // Correct action here
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const fetchAllJobRequest = () => ({
  type: actionTypes.FETCH_ALL_JOB_REQUEST,
});

export const fetchAllJobSuccess = (user) => ({
  type: actionTypes.FETCH_ALL_JOB_SUCCESS,
  payload: user,
});

export const fetchAllJobFailure = (error) => ({
  type: actionTypes.FETCH_ALL_JOB_FAILURE,
  payload: error,
});

export const fetchApplicationsByRecruiterId = (employerId, token) => {
  return async (dispatch) => {
    dispatch(fetchApplicationsByRecruiterIdRequest());
    try {
      const res = await getAllApplicationByRecruiterId(employerId, token);

      // Check the API response before using its properties
      if (res && res.EC === 0) {
        dispatch(fetchApplicationsByRecruiterIdSuccess(res.DT)); // Use the mapped data
        return { success: true };
      } else if (res && res.EM) {
        dispatch(fetchApplicationsByRecruiterIdFailure(res.EM));
      } else {
        dispatch(
          fetchApplicationsByRecruiterIdFailure("Unknown error occurred.")
        );
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(fetchApplicationsByRecruiterIdFailure(error.message)); // Correct action here
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const fetchApplicationsByRecruiterIdRequest = () => ({
  type: actionTypes.FETCH_ALL_APPLI_BY_RECRUI_REQUEST,
});

export const fetchApplicationsByRecruiterIdSuccess = (user) => ({
  type: actionTypes.FETCH_ALL_APPLI_BY_RECRUI_SUCCESS,
  payload: user,
});

export const fetchApplicationsByRecruiterIdFailure = (error) => ({
  type: actionTypes.FETCH_ALL_APPLI_BY_RECRUI_FAILURE,
  payload: error,
});

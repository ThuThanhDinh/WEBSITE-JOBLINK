// @ts-nocheck
// userAction.js
import actionTypes from "./actionType";
import { toast } from "react-toastify";
import { getAllUser } from "../../Services/adminService";

export const fetchAllUser = (token) => {
  return async (dispatch) => {
    dispatch(fetchAllUserRequest());
    try {
      const res = await getAllUser(token);

      // Check the API response before using its properties
      if (res && res.EC === 0) {
        dispatch(fetchAllUserSuccess(res.DT)); // Use the mapped data
        return { success: true };
      } else if (res && res.EM) {
        dispatch(fetchAllUserFailure(res.EM));
      } else {
        dispatch(fetchAllUserFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(fetchAllUserFailure(error.message)); // Correct action here
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const fetchAllUserRequest = () => ({
  type: actionTypes.FETCH_ALL_USER_REQUEST,
});

export const fetchAllUserSuccess = (user) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  payload: user,
});

export const fetchAllUserFailure = (error) => ({
  type: actionTypes.FETCH_ALL_USER_FAILURE,
  payload: error,
});

// @ts-nocheck
// userAction.js
import actionTypes from "./actionType";
import { toast } from "react-toastify";
import {
  postProfileUpdate,
  postCreateCV,
  postUpdateNotDefaultCV,
  getAllCVByUserId,
  postSetDefaultCV,
  postCreateApplication,
  getAllApplicationByUserId,
} from "../../Services/userService";
export const loginSuccess = (user, token) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const updateProfile = (
  fullName,
  phoneNumber,
  email,
  imageFile,
  token
) => {
  return async (dispatch) => {
    dispatch(updateProfileRequest());
    try {
      const res = await postProfileUpdate(
        fullName,
        phoneNumber,
        email,
        imageFile,
        token
      );

      if (res && res.EC === 0) {
        // Kiểm tra xem imageFile có tồn tại trong response hay không
        const updatedUser = {
          ...res.DT.user,
          imageFile: res.DT.user.imageFile || null, // Đảm bảo giá trị an toàn nếu không có imageFile
        };

        dispatch(updateProfileSuccess(updatedUser));
        toast.success(res.EM);
      } else {
        dispatch(updateProfileFailure(res.EM));
        toast.error(res.EM);
      }
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      alert(`Error: ${error.message}`);
    }
  };
};

export const updateProfileRequest = () => ({
  type: actionTypes.UPDATE_PROFILE_REQUEST,
});

export const updateProfileSuccess = (user) => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
  payload: user,
});

export const updateProfileFailure = (error) => ({
  type: actionTypes.UPDATE_PROFILE_FAILURE,
  payload: error,
});

// action creator
export const createCV = (id, nameCV, CVFile, token, isDefault) => {
  return async (dispatch) => {
    dispatch(createCVRequest());
    try {
      const res = await postCreateCV(id, nameCV, CVFile, token, isDefault);
      console.log("check res", res);

      // Kiểm tra phản hồi từ API trước khi sử dụng các thuộc tính
      if (res && res.EC === 0) {
        dispatch(createCVSuccess(res.DT.user));
        toast.success(res.EM);
        return { success: true };
      } else if (res && res.EM) {
        dispatch(createCVFailure(res.EM));
        toast.error(res.EM);
      } else {
        dispatch(createCVFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(createCVFailure(error.message));
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const createCVRequest = () => ({
  type: actionTypes.CREATE_CV_REQUEST,
});

export const createCVSuccess = (user) => ({
  type: actionTypes.CREATE_CV_SUCCESS,
  payload: user,
});

export const createCVFailure = (error) => ({
  type: actionTypes.CREATE_CV_FAILURE,
  payload: error,
});

export const updateAllNotDefaultCV = (userId, token) => {
  return async (dispatch) => {
    dispatch(updateAllNotDefaultCVRequest());
    try {
      const res = await postUpdateNotDefaultCV(userId, token);
      console.log("check res", res);

      // Kiểm tra phản hồi từ API trước khi sử dụng các thuộc tính
      if (res && res.EC === 0) {
        dispatch(updateAllNotDefaultCVSuccess(res.DT.user));
        // toast.success(res.EM);
        return { success: true };
      } else if (res && res.EM) {
        dispatch(updateAllNotDefaultCVFailure(res.EM));
        //toast.error(res.EM);
      } else {
        dispatch(updateAllNotDefaultCVFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(createCVFailure(error.message));
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const updateAllNotDefaultCVRequest = () => ({
  type: actionTypes.UPDATE_ALL_NOT_DEFAULT_CV_REQUEST,
});

export const updateAllNotDefaultCVSuccess = (user) => ({
  type: actionTypes.UPDATE_ALL_NOT_DEFAULT_CV_SUCCESS,
  payload: user,
});

export const updateAllNotDefaultCVFailure = (error) => ({
  type: actionTypes.UPDATE_ALL_NOT_DEFAULT_CV_FAILURE,
  payload: error,
});

// action creator
export const fetchAllCVByUserId = (userId, token) => {
  return async (dispatch) => {
    dispatch(fetchAllCVByUserIdRequest());
    try {
      const res = await getAllCVByUserId(userId, token);

      // Check the API response before using its properties
      if (res && res.EC === 0) {
        dispatch(fetchAllCVByUserIdSuccess(res.DT)); // Use the mapped data
        return { success: true };
      } else if (res && res.EM) {
        dispatch(fetchAllCVByUserIdFailure(res.EM));
      } else {
        dispatch(fetchAllCVByUserIdFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(fetchAllCVByUserIdFailure(error.message)); // Correct action here
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const fetchAllCVByUserIdRequest = () => ({
  type: actionTypes.FETCH_ALL_CV_BY_USER_ID_REQUEST,
});

export const fetchAllCVByUserIdSuccess = (user) => ({
  type: actionTypes.FETCH_ALL_CV_BY_USER_ID_SUCCESS,
  payload: user,
});

export const fetchAllCVByUserIdFailure = (error) => ({
  type: actionTypes.FETCH_ALL_CV_BY_USER_ID_FAILURE,
  payload: error,
});

export const setDefaultCV = (userId, cvId, token) => {
  return async (dispatch) => {
    dispatch(setDefaultCVRequest());
    try {
      const res = await postSetDefaultCV(userId, cvId, token);
      console.log("check res", res);

      // Kiểm tra phản hồi từ API trước khi sử dụng các thuộc tính
      if (res && res.EC === 0) {
        dispatch(setDefaultCVSuccess(res.DT.user));
        // toast.success(res.EM);
        return { success: true };
      } else if (res && res.EM) {
        dispatch(setDefaultCVFailure(res.EM));
        //toast.error(res.EM);
      } else {
        dispatch(setDefaultCVFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const setDefaultCVRequest = () => ({
  type: actionTypes.SET_DEFAULT_CV_REQUEST,
});

export const setDefaultCVSuccess = (user) => ({
  type: actionTypes.SET_DEFAULT_CV_SUCCESS,
  payload: user,
});

export const setDefaultCVFailure = (error) => ({
  type: actionTypes.SET_DEFAULT_CV_FAILURE,
  payload: error,
});

export const createApplication = (data, token) => {
  return async (dispatch) => {
    dispatch(createApplicationRequest());
    try {
      const res = await postCreateApplication(data, token);
      console.log("check res", res);

      // Kiểm tra phản hồi từ API trước khi sử dụng các thuộc tính
      if (res && res.EC === 0) {
        dispatch(createApplicationSuccess(res.DT.user));
        toast.success(res.EM);
        return { success: true };
      } else if (res && res.EM) {
        dispatch(createApplicationFailure(res.EM));
        toast.error(res.EM);
      } else {
        dispatch(createApplicationFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(createApplicationFailure(error.message));
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const createApplicationRequest = () => ({
  type: actionTypes.CREATE_APPLICATION_REQUEST,
});

export const createApplicationSuccess = (user) => ({
  type: actionTypes.CREATE_APPLICATION_SUCCESS,
  payload: user,
});

export const createApplicationFailure = (error) => ({
  type: actionTypes.CREATE_APPLICATION_FAILURE,
  payload: error,
});

export const fetchApplicationByUserId = (userId, token) => {
  return async (dispatch) => {
    dispatch(fetchAllApplicationByUserIdRequest());
    try {
      const res = await getAllApplicationByUserId(userId, token);

      if (res && res.EC === 0) {
        dispatch(fetchAllApplicationByUserIdSuccess(res.DT)); // Use the mapped data
        return { success: true };
      } else if (res && res.EM) {
        dispatch(fetchAllApplicationByUserIdFailure(res.EM));
      } else {
        dispatch(fetchAllApplicationByUserIdFailure("Unknown error occurred."));
        alert("Unknown error occurred.");
      }
    } catch (error) {
      dispatch(fetchAllApplicationByUserIdFailure(error.message)); // Correct action here
      alert(`Error: ${error.message}`);
    }
    return { success: false };
  };
};

export const fetchAllApplicationByUserIdRequest = () => ({
  type: actionTypes.FETCH_ALL_APPLICATION_BY_USER_ID_REQUEST,
});

export const fetchAllApplicationByUserIdSuccess = (user) => ({
  type: actionTypes.FETCH_ALL_APPLICATION_BY_USER_ID_SUCCESS,
  payload: user,
});

export const fetchAllApplicationByUserIdFailure = (error) => ({
  type: actionTypes.FETCH_ALL_APPLICATION_BY_USER_ID_FAILURE,
  payload: error,
});

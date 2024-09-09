import actionTypes from "../actions/actionType";

const initialState = {
  recruiter: {},
  token: null,
  error: null,
  loading: false,

  listJobByRecruiterId: [],
  listJob: [],
  listApplicationByRecruiterId: [],
};

const recruiterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Xóa lỗi trước khi thực hiện yêu cầu
      };

    case actionTypes.CREATE_JOB_SUCCESS:
      return {
        ...state,
        recruiter: {
          ...state.recruiter,
          ...action.payload, // Cập nhật thông tin người dùng với dữ liệu từ action
        },
        loading: false,
      };

    case actionTypes.CREATE_JOB_FAILURE:
      return {
        ...state,
        error: action.payload, // Lưu thông tin lỗi từ action
        loading: false,
      };

    case actionTypes.FETCH_ALL_JOB_BY_RECRUITER_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Clear any existing errors before making the request
      };

    case actionTypes.FETCH_ALL_JOB_BY_RECRUITER_ID_SUCCESS:
      return {
        ...state,
        listJobByRecruiterId: action.payload, // Update the listJobByRecruiterId with the data from the action
        loading: false,
      };

    case actionTypes.FETCH_ALL_JOB_BY_RECRUITER_ID_FAILURE:
      return {
        ...state,
        error: action.payload, // Save the error information from the action
        loading: false,
      };

    case actionTypes.FETCH_ALL_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_ALL_JOB_SUCCESS:
      return {
        ...state,
        listJob: action.payload,
        loading: false,
      };

    case actionTypes.FETCH_ALL_JOB_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case actionTypes.FETCH_ALL_APPLI_BY_RECRUI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Clear any existing errors before making the request
      };

    case actionTypes.FETCH_ALL_APPLI_BY_RECRUI_SUCCESS:
      return {
        ...state,
        listApplicationByRecruiterId: action.payload,
        loading: false,
      };

    case actionTypes.FETCH_ALL_APPLI_BY_RECRUI_FAILURE:
      return {
        ...state,
        error: action.payload, // Save the error information from the action
        loading: false,
      };

    default:
      return state;
  }
};

export default recruiterReducer;

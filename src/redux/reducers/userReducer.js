import actionTypes from "../actions/actionType";

const initialState = {
  user: {},
  token: null,
  error: null,
  loading: false,
  listCVByUserId: [],
  listApplicationByUserId: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };

    case actionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload, // Cập nhật chỉ những field cần thiết
          imageFile: action.payload.imageFile || null, // Xử lý khi imageFile không tồn tại
        },
        loading: false,
      };

    case actionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case actionTypes.CREATE_CV_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Xóa lỗi trước khi thực hiện yêu cầu
      };

    case actionTypes.CREATE_CV_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload, // Cập nhật thông tin người dùng với dữ liệu từ action
        },
        loading: false,
      };

    case actionTypes.CREATE_CV_FAILURE:
      return {
        ...state,
        error: action.payload, // Lưu thông tin lỗi từ action
        loading: false,
      };

    case actionTypes.UPDATE_ALL_NOT_DEFAULT_CV_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Xóa lỗi trước khi thực hiện yêu cầu
      };

    case actionTypes.UPDATE_ALL_NOT_DEFAULT_CV_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload, // Cập nhật thông tin người dùng với dữ liệu từ action
        },
        loading: false,
      };

    case actionTypes.UPDATE_ALL_NOT_DEFAULT_CV_FAILURE:
      return {
        ...state,
        error: action.payload, // Lưu thông tin lỗi từ action
        loading: false,
      };

    case actionTypes.FETCH_ALL_CV_BY_USER_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Clear any existing errors before making the request
      };

    case actionTypes.FETCH_ALL_CV_BY_USER_ID_SUCCESS:
      return {
        ...state,
        listCVByUserId: action.payload, // Update the listCVByUserId with the data from the action
        loading: false,
      };

    case actionTypes.FETCH_ALL_CV_BY_USER_ID_FAILURE:
      return {
        ...state,
        error: action.payload, // Save the error information from the action
        loading: false,
      };

    case actionTypes.SET_DEFAULT_CV_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Xóa lỗi trước khi thực hiện yêu cầu
      };

    case actionTypes.SET_DEFAULT_CV_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload, // Cập nhật thông tin người dùng với dữ liệu từ action
        },
        loading: false,
      };

    case actionTypes.SET_DEFAULT_CV_FAILURE:
      return {
        ...state,
        error: action.payload, // Lưu thông tin lỗi từ action
        loading: false,
      };

    case actionTypes.CREATE_APPLICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Xóa lỗi trước khi thực hiện yêu cầu
      };

    case actionTypes.CREATE_APPLICATION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload, // Cập nhật thông tin người dùng với dữ liệu từ action
        },
        loading: false,
      };

    case actionTypes.CREATE_APPLICATION_FAILURE:
      return {
        ...state,
        error: action.payload, // Lưu thông tin lỗi từ action
        loading: false,
      };

    case actionTypes.FETCH_ALL_APPLICATION_BY_USER_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Clear any existing errors before making the request
      };

    case actionTypes.FETCH_ALL_APPLICATION_BY_USER_ID_SUCCESS:
      return {
        ...state,
        listApplicationByUserId: action.payload, // Update the listCVByUserId with the data from the action
        loading: false,
      };

    case actionTypes.FETCH_ALL_APPLICATION_BY_USER_ID_FAILURE:
      return {
        ...state,
        error: action.payload, // Save the error information from the action
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;

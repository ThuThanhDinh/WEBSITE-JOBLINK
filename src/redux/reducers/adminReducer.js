import actionTypes from "../actions/actionType";

const initialState = {
  admin: {},
  token: null,
  error: null,
  loading: false,

  listJob: [],
  listUser: [],
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.CREATE_JOB_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null, // Xóa lỗi trước khi thực hiện yêu cầu
    //   };

    // case actionTypes.CREATE_JOB_SUCCESS:
    //   return {
    //     ...state,
    //     recruiter: {
    //       ...state.recruiter,
    //       ...action.payload, // Cập nhật thông tin người dùng với dữ liệu từ action
    //     },
    //     loading: false,
    //   };

    // case actionTypes.CREATE_JOB_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload, // Lưu thông tin lỗi từ action
    //     loading: false,
    //   };

    case actionTypes.FETCH_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      return {
        ...state,
        listUser: action.payload,
        loading: false,
      };

    case actionTypes.FETCH_ALL_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default AdminReducer;

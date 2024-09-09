// rootReducer.js
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import recruiterReducer from "./recruiterReducer";
import AdminReducer from "./adminReducer";

const rootReducer = combineReducers({
  user: userReducer,
  recruiter: recruiterReducer,
  admin: AdminReducer,
  // Nếu có thêm reducers, thêm chúng vào đây.
});

export default rootReducer;

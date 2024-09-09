import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // lưu trữ vào localStorage
import rootReducer from "./redux/reducers/rootReducer"; // thay đổi đường dẫn theo cấu trúc dự án của bạn
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
// Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
  // Có thể thêm các cấu hình khác nếu cần, ví dụ: blacklist, whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// Tạo persistor từ store
const persistor = persistStore(store);

export { store, persistor };

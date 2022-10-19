import { combineReducers } from "redux";
import getLoginClickedReducer from "../components/common/reducer";
import loginReducer from "../components/login/reducer";

const rootReducer = combineReducers({
  loginMenuItem: getLoginClickedReducer,
  user: loginReducer,
});

export default rootReducer;

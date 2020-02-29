import { combineReducers } from "redux";
import reportReducer from "./report";
import loginReducer from "./login";
import projectReducer from "./project";

export default combineReducers({
  reportReducer,
  loginReducer,
  projectReducer
});

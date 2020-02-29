import { all } from "redux-saga/effects";
import reportWatcher from "./report";
import loginWatcher from "./login";
import projectWatcher from "./project";

function* rootSaga() {
  yield all([reportWatcher(), loginWatcher(), projectWatcher()]);
}

export default rootSaga;

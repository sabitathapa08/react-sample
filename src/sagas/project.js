import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as types from "../constants/project";
import * as actions from "../actions/project";

function* getAllProjects(action) {
  const token = localStorage.getItem("token");

  try {
    const data = yield call(() => axios.get(`/project/`, token));
    yield put(actions.getAllProjectsSuccess, data.data);
  } catch (e) {
    yield put(actions.getAllProjectsFailure, e);
  }
}

function* getProjectById(action) {
  const token = localStorage.getItem("token");
  const {
    payload: { id }
  } = action;
  try {
    const data = yield call(() => axios.get(`/project/${id}/`, token));
    yield put(actions.getProjectByIdSuccess, data.data);
  } catch (e) {
    yield put(actions.getProjectByIdFailure, e);
  }
}

function* postProject(action) {
  const token = localStorage.getItem("token");
  let multipart = new FormData();

  const { payload, sheets, contracts } = action;

  multipart.append("data", payload);
  multipart.append("upload_estimation_sheet", sheets);
  multipart.append("upload_contract_programme", contracts);
  try {
    const response = yield call(() =>
      axios.post(`/project/`, multipart, {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: token ? "Token " + token : ""
        },
        onUploadProgress: function(progressEvent) {
          const uploadPercentage = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
          return uploadPercentage;
        }
      })
    );
    yield put(actions.postProjectsSuccess, response);
  } catch (e) {
    yield put(actions.postProjectsFailure, response);
  }
}

function* projectWatcher() {
  yield takeLatest(types.GET_ALL_PROJECTS_REQUEST, getAllProjects);
  yield takeLatest(types.POST_PROJECT_REQUEST, postProject);
  yield takeLatest(types.GET_PROJECT_BY_ID_REQUEST, getProjectById);
}

export default projectWatcher;

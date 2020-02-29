import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as types from "../constants/report";
import * as actions from "../actions/report";

function* getReportData(action) {
  const { id, type } = action.payload;
  try {
    const resp = yield call(() =>
      axios.get(`v4/api/reporting/reports-list/${id}/?type=${type}`)
    );

    yield put(actions.getReportDataSuccess(resp.data));
  } catch (e) {
    yield put(actions.getReportDataFailure(e));
  }
}

function* getMetrics(action) {
  const { projectId } = action.payload;
  try {
    const resp = yield call(() =>
      axios.get(`v4/api/reporting/metrics-data/${projectId}/`)
    );

    yield put(actions.getMetricsSuccess(resp.data));
  } catch (e) {
    yield put(actions.getMetricsFailure(e));
  }
}

function* addReport(action) {
  const { projectId, body } = action;
  try {
    const resp = yield call(() =>
      axios.post(`/v4/api/reporting/add-report/${projectId}/`, body)
    );

    yield put(actions.addReportSuccess(resp.data));
  } catch (e) {
    yield put(actions.addReportFailure(e));
  }
}

function* getForms(action) {
  const { projectId, type } = action.payload;
  try {
    const resp = yield call(() =>
      axios.get(
        `v4/api/reporting/project-form-data/${projectId}/?form_type=${type}`
      )
    );

    yield put(actions.getFormSuccess(resp.data));
  } catch (e) {
    yield put(actions.getFormFailure(e));
  }
}
function* getFormQuestions(action) {
  const { id, projectId } = action.payload;
  try {
    const resp = yield call(() =>
      axios.get(`fieldsight/api/project/forms/${projectId}/?id=${id}`)
    );

    yield put(actions.getFormQuestionsSuccess(resp.data));
  } catch (e) {
    yield put(actions.getFormQuestionsFailure(e));
  }
}

function* reportWatcher() {
  yield takeLatest(types.GET_REPORT_DATA_REQUEST, getReportData);
  yield takeLatest(types.ADD_REPORT_REQUEST, addReport);
  yield takeLatest(types.GET_METRICS_REQUEST, getMetrics);
  yield takeLatest(types.GET_FORMS_REQUEST, getForms);
  yield takeLatest(types.GET_FORMS_QUESTIONS_REQUEST, getFormQuestions);
}
export default reportWatcher;

import { takeLatest, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import * as types from '../constants/login';
import * as actions from '../actions/login';
import { successToast } from '../utils/toastHandler';

function* responseOnSuccess() {
  yield put(push('/dashboard'));
}

function* loginRequest(action) {
  const { payload } = action;
  try {
    const data = yield call(() => axios.post('/user/login', payload));
    yield put(actions.userLoginSuccess, data.data);
    if (data.data) {
      yield fork(responseOnSuccess);
    }
  } catch (e) {
    yield put(actions.userLoginRequest, e);
  }
}

function* logoutUser() {
  localStorage.clear();
  yield put(actions.logoutUsersSuccess);
  yield put(push('/login'));
  successToast('You logged out successfully.');
}

function* loginWatcher() {
  yield takeLatest(types.USER_LOGIN_REQUEST, loginRequest);
  yield takeLatest(types.LOGOUT_USER_REQUEST, logoutUser);
}

export default loginWatcher;

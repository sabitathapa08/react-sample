import { createSelector } from "reselect";

const loginSelector = state => state.global.loginReducer;

const makeSelectGetUserResponse = () =>
  createSelector(
    loginSelector,
    state => state.userData
  );
const makeSelectErrorResponse = () =>
  createSelector(
    loginSelector,
    state => state.error
  );
const makeSelectSuccessResponse = () =>
  createSelector(
    loginSelector,
    state => state.success
  );
const makeSelectLogoutResponse = () =>
  createSelector(
    loginSelector,
    state => state.logoutResponse
  );
export {
  makeSelectGetUserResponse,
  makeSelectErrorResponse,
  makeSelectLogoutResponse,
  makeSelectSuccessResponse
};

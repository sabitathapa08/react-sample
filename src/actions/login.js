import action from "../utils/actionCreators";
import * as types from "../constants/login";

export const userLoginRequest = action(types.USER_LOGIN_REQUEST, "payload");
export const userLoginSuccess = action(types.USER_LOGIN_SUCCESS);
export const userLoginFailure = action(types.USER_LOGIN_FAILURE);

export const logoutUsersRequest = action(types.LOGOUT_USER_REQUEST);
export const logoutUsersSuccess = action(types.LOGOUT_USER_SUCCESS);
export const logoutUsersFailure = action(types.LOGOUT_USER_FAILURE);

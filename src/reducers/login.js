import * as types from "../constants/login";

const initialState = {
  request: false,
  success: false,
  error: "",
  userData: {},
  logoutResponse: "",
  logoutError: ""
};

function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST: {
      return {
        ...state,
        request: true,
        userData: {}
      };
    }
    case types.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        request: false,
        success: true,
        userData: action.payload ? action.payload : {}
      };
    }
    case types.USER_LOGIN_FAILURE: {
      return {
        ...state,
        request: false,
        success: false,
        error: action.payload ? action.payload.error : "Something went wrong"
      };
    }
    case types.LOGOUT_USER_REQUEST:
      return {
        ...state,
        requesting: true,
        error: ""
      };
    case types.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        logoutResponse: "You logged out successfully.",
        userData: {},
        error: ""
      };

    default: {
      return state;
    }
  }
}

export default loginReducer;

import * as types from "../constants/report";

const initialState = {
  reports: [],
  onRequest: false,
  errors: false,
  metrics: [],
  forms: [],
  formQuestions: [],
  postReportSuccess: false,
  formTypes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_REPORT_DATA_REQUEST: {
      return {
        ...state,
        onRequest: true
      };
    }
    case types.GET_REPORT_DATA_SUCCESS: {
      return {
        ...state,
        onRequest: false,
        reports: action.payload
      };
    }
    case types.GET_REPORT_DATA_FAILURE: {
      return {
        ...state,
        onRequest: false,
        errors: true
      };
    }
    case types.ADD_REPORT_REQUEST: {
      return {
        ...state,
        onRequest: true,
        errors: false
      };
    }
    case types.ADD_REPORT_SUCCESS: {
      return {
        ...state,
        onRequest: false,
        postReportSuccess: true
      };
    }
    case types.ADD_REPORT_FAILURE: {
      return {
        ...state,
        onRequest: false,
        errors: true
      };
    }
    case types.GET_METRICS_REQUEST: {
      return {
        ...state,
        onRequest: true,
        errors: false
      };
    }
    case types.GET_METRICS_SUCCESS: {
      return {
        ...state,
        onRequest: false,
        reports: action.payload
      };
    }
    case types.GET_METRICS_FAILURE: {
      return {
        ...state,
        onRequest: false,
        errors: true
      };
    }
    case types.GET_FORMS_REQUEST: {
      return {
        ...state,
        onRequest: true,
        errors: false
      };
    }
    case types.GET_FORMS_SUCCESS: {
      return {
        ...state,
        onRequest: false,
        forms: action.payload
      };
    }
    case types.GET_FORMS_FAILURE: {
      return {
        ...state,
        onRequest: false,
        errors: true
      };
    }
    case types.GET_FORMS_QUESTIONS_REQUEST: {
      return {
        ...state,
        onRequest: true,
        errors: false
      };
    }
    case types.GET_FORMS_QUESTIONS_SUCCESS: {
      return {
        ...state,
        onRequest: false,
        formQuestions: action.payload
      };
    }
    case types.GET_FORMS_QUESTIONS_FAILURE: {
      return {
        ...state,
        onRequest: false,
        errors: true
      };
    }
    default:
      return state;
  }
}

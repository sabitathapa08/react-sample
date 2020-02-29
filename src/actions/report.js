import action from '../utils/actionCreators';
import * as types from '../constants/report';

export const getReportDataRequest = action(
  types.GET_REPORT_DATA_REQUEST,
  'payload',
);
export const getReportDataSuccess = action(
  types.GET_REPORT_DATA_SUCCESS,
);
export const getReportDataFailure = action(
  types.GET_REPORT_DATA_FAILURE,
);

export const getMetricsRequest = action(
  types.GET_METRICS_REQUEST,
  'payload',
);
export const getMetricsSuccess = action(types.GET_METRICS_SUCCESS);
export const getMetricsFailure = action(types.GET_METRICS_FAILURE);

export const addReportRequest = action(
  types.ADD_REPORT_REQUEST,
  'projectId',
  'body',
);
export const addReportSuccess = action(types.ADD_REPORT_SUCCESS);
export const addReportFailure = action(types.ADD_REPORT_FAILURE);

export const getFormRequest = action(
  types.GET_FORM_REQUEST,
  'payload',
);
export const getFormSuccess = action(types.GET_FORM_SUCCESS);
export const getFormFailure = action(types.GET_FORM_FAILURE);

export const getFormQuestionsRequest = action(
  types.GET_FORMS_QUESTIONS_REQUEST,
  'payload',
);
export const getFormQuestionsSuccess = action(
  types.GET_FORMS_QUESTIONS_SUCCESS,
);
export const getFormQuestionsFailure = action(
  types.GET_FORMS_QUESTIONS_FAILURE,
);

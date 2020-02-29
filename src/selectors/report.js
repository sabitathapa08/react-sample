import { createSelector } from "reselect";
const reportSelector = state => state.global.reportReducer;

const makeSelectReportList = () =>
  createSelector(reportSelector, state => state.reports);
const makeSelectErrorResponse = () =>
  createSelector(reportSelector, state => state.errors);
const makeSelectReportsLoad = () =>
  createSelector(reportSelector, state => state.onRequest);
const makeSelectMetrics = () =>
  createSelector(reportSelector, state => state.metrics);
const makeSelectForms = () =>
  createSelector(reportSelector, state => state.forms);
const makeSelectFormQuestions = () =>
  createSelector(reportSelector, state => state.formQuestions);
const makeSelectPostReportSuccess = () =>
  createSelector(reportSelector, state => state.postReportSuccess);

export {
  makeSelectReportList,
  makeSelectErrorResponse,
  makeSelectReportsLoad,
  makeSelectMetrics,
  makeSelectForms,
  makeSelectFormQuestions,
  makeSelectPostReportSuccess
};

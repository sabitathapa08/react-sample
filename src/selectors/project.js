import { createSelector } from "reselect";

const projectMgmtSelector = state => state.global.projectReducer;
const makeSelectRequest = () =>
  createSelector(projectMgmtSelector, state => state.request);
const makeSelectSuccessResponse = () =>
  createSelector(projectMgmtSelector, state => state.success);
const makeSelectErrorResponse = () =>
  createSelector(projectMgmtSelector, state => state.error);
const makeSelectProjectListResponse = () =>
  createSelector(projectMgmtSelector, state => state.projectList);
const makeSelectProjectById = () =>
  createSelector(projectMgmtSelector, state => state.projectById);
const paginationSelector = () =>
  createSelector(projectMgmtSelector, state => state.pagination);
const postProjectSelector = () =>
  createSelector(projectMgmtSelector, state => state.projectResponse);

export {
  makeSelectRequest,
  makeSelectSuccessResponse,
  makeSelectErrorResponse,
  makeSelectProjectListResponse,
  makeSelectProjectById,
  paginationSelector,
  postProjectSelector
};

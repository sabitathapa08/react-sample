import action from "../utils/actionCreators";
import * as types from "../constants/project";

export const getAllProjectsRequest = action(
  types.GET_ALL_PROJECTS_REQUEST,
  "payload"
);
export const getAllProjectsSuccess = action(types.GET_ALL_PROJECTS_SUCCESS);
export const getAllProjectsFailure = action(types.GET_ALL_PROJECTS_FAILURE);

export const postProjectsRequest = action(
  types.POST_PROJECT_REQUEST,
  "payload",
  "sheets",
  "contracts"
);
export const postProjectsSuccess = action(types.POST_PROJECT_SUCCESS);
export const postProjectsFailure = action(types.POST_PROJECT_FAILURE);

export const getProjectByIdRequest = action(
  types.GET_PROJECT_BY_ID_REQUEST,
  "id"
);
export const getProjectByIdSuccess = action(types.GET_PROJECT_BY_ID_SUCCESS);
export const getProjectByIdFailure = action(types.GET_PROJECT_BY_ID_FAILURE);

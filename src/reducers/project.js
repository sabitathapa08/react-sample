import * as types from "../constants/project";

const initialState = {
  request: false,
  success: false,
  error: false,
  projects: [],
  uploadRequest: false,
  projectById: {},
  pagination: {
    totalPages: null,
    total: null,
    perPage: null,
    currentPage: null
  },
  projectResponse: ""
};

function projectReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_ALL_PROJECTS_REQUEST:
      return {
        ...state,
        request: true
      };
    case types.GET_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        request: false,
        success: true,
        projectList: action.data ? action.data.dataList : [],
        pagination: {
          ...state.pagination,
          totalPages: action.data.total_pages,
          perPage: action.data.per_page,
          total: action.data.total,
          currentPage: action.data.current_page
        }
      };
    case types.GET_ALL_PROJECTS_FAILURE:
      return {
        ...state,
        request: false,
        error: true
      };
    case types.GET_PROJECT_BY_ID_REQUEST:
      return {
        ...state,
        request: true
      };

    case types.GET_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        request: false,
        success: true,
        projectById: action.data ? action.data : {}
      };
    case types.GET_ALL_PROJECTS_FAILURE:
      return {
        ...state,
        request: false,
        error: false
      };
    case types.POST_PROJECT_REQUEST:
      return {
        ...state,
        uploadRequest: true
      };

    case types.POST_PROJECT_SUCCESS:
      return {
        ...state,
        uploadRequest: false,
        success: true,
        projectResponse: action.response ? action.response : {}
      };
    case types.POST_PROJECT_FAILURE:
      return {
        ...state,
        uploadRequest: false,
        error: true
      };
  }
}

export default projectReducer;

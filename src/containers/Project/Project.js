import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Button, Icon, Modal } from "react-materialize";
import addMonths from "date-fns/addMonths";
import ProjectTable from "./ProjectTable";
import AddNewReport from "../AddNewReport";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import debounce from "../../utils/debounce";

import {
  getAllProjectsRequest,
  postProjectsRequest
} from "../../actions/project";

import {
  makeSelectProjectListResponse,
  postProjectSelector,
  paginationSelector
} from "../../selectors/project";

const validFileExt = [
  "xla",
  "xlam",
  "xlr",
  "xls",
  "xlsx",
  "xlsm",
  "xlsb",
  "xlt",
  "xltx",
  "xltm",
  "xlw",
  "xml"
];

const mapStateToProps = createStructuredSelector({
  projectList: makeSelectProjectListResponse(),
  addProjectSuccess: postProjectSelector(),
  pagination: paginationSelector()
});

const mapDispatchToProps = dispatch => ({
  getAllProjectsRequest: payload => dispatch(getAllProjectsRequest(payload)),
  postForm: (data, sheets, contracts) =>
    dispatch(postProjectsRequest(data, sheets, contracts))
});

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      data: {
        name: "",
        description: "",
        start_date: new Date(),
        end_date: addMonths(new Date(), 1),
        code: "",
        status: "1",
        active: false,
        state: "",
        plan_budget: 0,
        actual_budget: 0,
        type: "0",
        organization: 1,
        client: "",
        created_by: localStorage.getItem("user_id")
          ? localStorage.getItem("user_id")
          : "",
        state: "",
        assign_to: []
      },
      sheets: {
        upload_estimation_sheet: {},
        sheet_name: ""
      },
      contracts: {
        upload_contract_programme: {},
        contract_name: ""
      },
      buttonDisable: false,
      errors: {},
      respRoles: [],

      showModal: false,
      orgList: [],

      tagList: [],
      userList: [],
      errors: {},
      userId: localStorage.getItem("user_id")
    };
  }

  componentDidMount() {
    this.requestHandler(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.length > 0 && prevProps.users !== this.props.users) {
      const list = this.props.users;
      const newArr = [];
      list.forEach(value => {
        if (value.groups.length > 0) {
          value.groups.forEach(g => {
            newArr.push({
              name: value.username,
              post: g.name,
              value: value.id
            });
          });
        }
      });
      this.setState({
        userList: newArr
      });
    }
    if (prevProps.addProjectSuccess !== this.props.addProjectSuccess) {
      this.setState(
        {
          showModal: false
        },
        () => {
          this.requestHandler(1);
        }
      );
    }
  }

  requestHandler = page => {
    if (this.state.userId == 1) this.props.getAllProjectsRequest({ page });
  };

  clearState = () => {
    this.setState({
      data: {
        ...this.state.data,
        name: "",
        description: "",
        start_date: new Date(),
        end_date: addMonths(new Date(), 1),
        code: "",
        status: "1",
        active: false,
        state: "",
        type: "0",
        client: "",
        state: "",
        assign_to: []
      },
      tagList: [],
      sheets: {
        ...this.state.sheets,
        upload_estimation_sheet: {},
        sheet_name: ""
      },
      contracts: {
        ...this.state.contracts,
        upload_contract_programme: {},
        contract_name: ""
      },
      showModal: false,
      errors: {}
    });
  };

  getList = () => {
    this.props.loadClients({ data: "all" });
    this.props.loadUsers({ data: "all" });
    this.setState({
      showModal: true
    });
  };

  handleAssingTo = e => {
    e.persist();
    const newValue = JSON.parse(e.target.value);
    const newName = e.target.options[e.target.selectedIndex].text;

    this.setState(state => {
      if (!newValue) {
        const errors = {};
        errors.assign_to = "Required";
        return {
          errors,
          data: {
            ...this.state.data,
            assign_to: []
          },
          tagList: []
        };
      } else if (state.data.assign_to.includes(newValue)) {
        return {
          data: {
            ...this.state.data,
            assign_to: this.state.data.assign_to.filter(
              (each, idx) => each !== newValue
            )
          },
          tagList: this.state.tagList.filter(i => i.name != newName)
        };
      } else {
        return {
          data: {
            ...this.state.data,
            assign_to: [...this.state.data.assign_to, newValue]
          },
          tagList: [...this.state.tagList, { name: newName, id: newValue }]
        };
      }
    });
  };

  handleDeleteChip = (e, selected, id) => {
    this.setState({
      data: {
        ...this.state.data,
        assign_to: this.state.data.assign_to.filter(each => each !== id)
      },
      tagList: this.state.tagList.filter(i => i.name != selected)
    });
  };

  getFileExtension = name => {
    if (!name) {
      return;
    }
    const lastDot = name.lastIndexOf(".");
    const ext = name.substring(lastDot + 1);
    return ext;
  };

  handleSheetUpload = e => {
    e.preventDefault();

    this.setState(
      {
        errors: {},
        sheets: {
          ...this.state.sheets,
          upload_estimation_sheet: e.target.files[0] ? e.target.files[0] : {},
          sheet_name: e.target.files[0] ? e.target.files[0].name : ""
        }
      },
      () => {
        const errors = {};

        const fileExt = this.getFileExtension(
          this.state.sheets.upload_estimation_sheet.name
        );

        if (validFileExt.indexOf(fileExt) == -1) {
          errors.upload_estimation_sheet = "Please select a proper file.";
        }

        this.setState({ errors });
      }
    );
  };

  handleContractUpload = e => {
    e.preventDefault();

    this.setState(
      {
        errors: {},
        contracts: {
          ...this.state.contracts,
          upload_contract_programme: e.target.files[0] ? e.target.files[0] : {},
          contract_name: e.target.files[0] ? e.target.files[0].name : ""
        }
      },
      () => {
        const errors = {};
        const fileExt = this.getFileExtension(
          this.state.contracts.upload_contract_programme.name
        );

        if (validFileExt.indexOf(fileExt) == -1) {
          errors.upload_contract_programme = "Please select a proper file.";
        }
        this.setState({ errors });
      }
    );
  };

  handleValidation = () => {
    let errors = {};
    const { data, sheets, contracts } = this.state;
    if (!data.code) errors.codeErr = "Project id is required.";
    if (!data.name) errors.nameErr = "Project name is required.";
    if (!data.state) errors.stateErr = "State is required.";
    if (!data.client) errors.clientErr = "Client is required.";
    if (!sheets.upload_estimation_sheet)
      errors.upload_estimation_sheet = "Estimation sheet is required.";
    if (!contracts.upload_contract_programme)
      errors.upload_contract_programme = "Contract sheet is required.";
    return errors;
  };

  handleRadioChange = (e, name) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: e.target.value
      }
    });
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [`${name}Err`]: ""
      }
    });
  };

  handleStartDateChange = e => {
    const {
      data: { end_date }
    } = this.state;
    let errors = {};
    this.setState(state => {
      if (e > end_date) {
        errors.start_date = "Start date must be less than completion date.";
        return {
          data: {
            ...this.state.data,
            start_date: e
          },
          errors
        };
      } else {
        errors = {};
        return {
          data: {
            ...this.state.data,
            start_date: e
          },
          errors
        };
      }
    });
  };

  handleEndDateChange = e => {
    const {
      data: { start_date }
    } = this.state;
    let errors = {};
    this.setState(state => {
      if (e < start_date) {
        errors.end_date = "Completion date must be greater than start date.";
        return {
          data: {
            ...this.state.data,
            end_date: e
          },
          errors
        };
      } else {
        errors = {};
        return {
          data: {
            ...this.state.data,
            end_date: e
          },
          errors
        };
      }
    });
  };

  handleOnChecked = e => {
    e.persist();

    this.setState(state => {
      return {
        data: {
          ...state.data,
          active: !this.state.data.active
        }
      };
    });
  };

  addClicked = () => {
    const errors = this.handleValidation();

    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      const sheets = !!this.state.sheets.upload_estimation_sheet
        ? this.state.sheets.upload_estimation_sheet
        : "";
      const contract = !!this.state.contracts.upload_contract_programme
        ? this.state.contracts.upload_contract_programme
        : "";

      this.props.postForm(this.state.data, sheets, contract);
    } else {
      console.log("error in project upload");
    }
  };

  editProject = id => {
    // this.props.editProjectById(id);
  };

  budgetPage = id => {
    // this.props.loadBudgetById(id);
  };

  selectProjectHandler = project => {
    // this.props.selectProject(project);
  };

  debounceHandler = debounce(
    () => this.props.getAllProjectsRequest({ q: this.state.searchText.trim() }),
    1000
  );

  searchHandler = e => {
    const {
      target: { value }
    } = e;
    this.setState(
      {
        searchText: value
      },
      this.debounceHandler
    );
  };

  searchSubmitHandler = () => {
    this.props.getAllProjectsRequest({ q: this.state.searchText.trim() });
  };

  render() {
    const {
      props: {
        projectList,
        userPermission,
        getProjectsSuccess,
        pagination: { total, perPage, totalPages, currentPage }
      },
      state: { showModal, searchText },
      requestHandler,
      searchHandler,
      searchSubmitHandler
    } = this;
    const isParams =
      Object.keys(this.props.match.params).length == 0 ? false : true;

    return (
      <>
        <div className="card-header">
          <h5>Projects</h5>

          {userPermission.data && userPermission.data.project.add_project && (
            <div className="add-btn">
              <Button
                href="#modal1"
                className="modal-trigger varicon-button"
                node="a"
                floating
                waves="light"
                small
                onClick={this.getList}
              >
                <Icon left>add</Icon>
              </Button>
              <span>Add Project</span>
            </div>
          )}
          <Modal
            id="modal1"
            header="Add Project"
            className="formModal"
            actions={
              <div>
                <Button
                  waves="green"
                  onClick={this.addClicked}
                  flat
                  className="varicon-button"
                >
                  Add
                </Button>
                <Button
                  waves="green"
                  modal="close"
                  flat
                  onClick={this.clearState}
                >
                  Cancel
                </Button>
              </div>
            }
            open={showModal}
            options={{ onCloseEnd: this.clearState }}
          >
            <AddNewReport />
          </Modal>
        </div>

        <div className="card-content">
          <Search
            searchText={searchText}
            searchHandler={searchHandler}
            searchSubmitHandler={searchSubmitHandler}
          />

          {getProjectsSuccess ? (
            <ProjectTable
              projectData={projectList}
              budgetPage={this.budgetPage}
              editProject={this.editProject}
              projectPermission={
                userPermission.data && userPermission.data.project
              }
              selectProjectHandler={this.selectProjectHandler}
            />
          ) : (
            <Loader height="450px" />
          )}
        </div>
        {getProjectsSuccess && projectList.length > 0 && (
          <Pagination
            total={total}
            perPage={perPage}
            currentPage={currentPage}
            totalPages={totalPages}
            requestHandler={requestHandler}
          />
        )}
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Project);

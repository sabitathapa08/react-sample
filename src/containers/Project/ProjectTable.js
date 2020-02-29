import React, { Component } from "react";
import { Icon } from "react-materialize";

class ProjectTable extends Component {
  getCountryStateName = state => {
    switch (state) {
      case 1:
        return "New South Wales";
      case 2:
        return "Queensland";
      case 3:
        return "South Australia";

      case 4:
        return "Tasmania";

      case 5:
        return "Victoria";

      case 6:
        return "Western Australia";
      default:
        return "";
    }
  };

  editHandler = (e, id) => {
    e.stopPropagation();
    this.props.editProject(id);
  };

  rowClickHandler = project => {
    const { budgetPage, selectProjectHandler } = this.props;
    selectProjectHandler(project);
    budgetPage(project.id);
  };

  getStatus = status => {
    switch (status) {
      case 1:
        return "active";
      case 2:
        return "inactive";
      case 3:
        return "completed";
    }
  };

  render() {
    const {
      props: { projectData, projectPermission },
      editHandler,
      getCountryStateName,
      rowClickHandler,
      getStatus
    } = this;

    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="varicon-table mr-0">
            <table className="table">
              <colgroup>
                <col span="4" className="description-col"></col>
              </colgroup>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Project Name</th>
                  <th>Type</th>
                  <th>Status</th>

                  <th>Start Date</th>
                  <th>Completion Date</th>
                  <th>State</th>
                  {projectPermission && projectPermission.change_project && (
                    <th>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {projectData.length > 0 ? (
                  projectData.map(project => (
                    <tr
                      className=""
                      key={project.id}
                      onClick={() => rowClickHandler(project)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{project.code}</td>
                      <td>{project.name}</td>
                      <td>{project.type == 0 ? "Civil" : "Demolition"}</td>

                      <td>
                        <span
                          className={`status  varicon-${getStatus(
                            project.status
                          )}`}
                          style={{ textTransform: "capitalize" }}
                        >
                          {getStatus(project.status)}
                        </span>
                      </td>
                      <td>
                        {project.start_date &&
                          new Date(project.start_date).toDateString()}
                      </td>

                      <td>
                        {project.end_date &&
                          new Date(project.end_date).toDateString()}
                      </td>

                      <td> {getCountryStateName(project.state)}</td>
                      {projectPermission && projectPermission.change_project && (
                        <td>
                          <div className="action">
                            <span
                              className="action-icon edit-icon varicon-active"
                              onClick={e => editHandler(e, project.id)}
                            >
                              <Icon>edit</Icon>
                            </span>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={
                        projectPermission && projectPermission.change_project
                          ? "8"
                          : "7"
                      }
                    >
                      No record available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectTable;

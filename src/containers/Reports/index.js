import React from "react";
import ReportList from "./ReportList";
import { ProjectId } from "../../constants";

function Reports(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h4>Reports</h4>
      </div>
      <div className="card-body">
        <ReportList id={ProjectId} history={props.history} />
      </div>
    </div>
  );
}

export default Reports;

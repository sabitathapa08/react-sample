import React, { useState } from "react";
import format from "date-fns/format";
import { Dropdown } from "react-bootstrap";
import { SharedDataCrude as DataCrude } from "../../constants";

const SharedWithMe = () => {
  const [sharedList] = useState([
    {
      id: 1,
      title: "test",
      description: "testing desc",
      created_at: new Date(),
      type: 0,
      hasShared: false
    }
  ]);

  return (
    <div className="card-body">
      {sharedList.length > 0 &&
        sharedList.map(shared => (
          <div className="report-list" key={shared.id}>
            <div className="row">
              <div className="col-md-8">
                <div className="report-content">
                  <h4>{shared.title}</h4>
                  <p>{shared.description}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="report-share-time">
                  <div className="report-item created-time">
                    <h6>Date Created</h6>
                    <p>{format(shared.created_at, ["MMMM Do yyyy"])}</p>
                    <time>{format(shared.created_at, ["h:mm a"])}</time>
                  </div>
                  <div className="report-item share-report">
                    <h6>Owner</h6>
                    <ul className="shared-list">
                      <li>Santosh khanal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown report-option">
              <Dropdown drop="left">
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-Data"
                  className="dropdown-toggle common-button no-border is-icon"
                >
                  <i className="material-icons">more_vert</i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                  {DataCrude.map(item => (
                    <Dropdown.Item key={item.id}>{item.title}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ))}
      {sharedList.length === 0 && <div>No Report Shared Yet.</div>}
    </div>
  );
};

export default SharedWithMe;

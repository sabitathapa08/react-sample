import React, { useState } from "react";
import MyReports from "./MyReports";
import ShareWithMe from "./SharedWithMe";

function ReportList() {
  const [activeTab, setActiveTab] = useState("myReports");

  const toggleTab = result => {
    setActiveTab(result);
  };

  return (
    <div className="reports mrb-30">
      <div className="card">
        <div className="reports-header mt-4">
          <ul className="common-tab is-bg">
            <li
              className={activeTab === "myReports" ? "current" : ""}
              // tabIndex="0"
              role="presentation"
              onClick={() => {
                toggleTab("myReports");
              }}
              onKeyDown={() => {
                toggleTab("myReports");
              }}
            >
              My Reports
            </li>
            <li
              className={activeTab === "sharedWithMe" ? "current" : ""}
              // tabIndex="0"
              role="presentation"
              onKeyDown={() => {
                toggleTab("sharedWithMe");
              }}
              onClick={() => {
                toggleTab("sharedWithMe");
              }}
            >
              shared with me
            </li>
          </ul>
        </div>
        {activeTab === "myReports" && <MyReports id={123} />}
        {activeTab === "sharedWithMe" && <ShareWithMe id={123} />}
      </div>
    </div>
  );
}

export default ReportList;

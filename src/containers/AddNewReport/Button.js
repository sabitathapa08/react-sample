import React from "react";

const Button = ({
  handleToggleDelete,
  selectedMetrics,
  handleSubmitReport
}) => {
  <div className="col-lg-12">
    <div className="buttons flex-end">
      <button
        type="button"
        className="common-button is-border"
        onClick={() => {
          handleToggleDelete();
        }}
      >
        Discard Changes
      </button>
      <button
        type="button"
        className="common-button is-bg"
        disabled={selectedMetrics.length === 0}
        onClick={() => {
          handleSubmitReport();
        }}
      >
        Save Report
      </button>
    </div>
  </div>;
};

export default Button;

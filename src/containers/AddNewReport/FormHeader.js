import React from "react";

const FormHeader = ({ isEdit, handleToggleDelete }) => (
  <div className="reports-header mt-4">
    {isEdit && <h3 className="mb-3">Edit report</h3>}
    {!isEdit && <h3 className="mb-3">New report</h3>}
    <button
      type="button"
      className="common-button no-border is-icon"
      onClick={() => {
        handleToggleDelete();
      }}
    >
      <i className="material-icons">close</i>
      <span>Cancel</span>
    </button>
  </div>
);
export default FormHeader;

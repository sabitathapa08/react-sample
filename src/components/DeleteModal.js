import React from "react";
import Zoom from "react-reveal/Zoom";

const DeleteModal = props => {
  const { onCancel, onConfirm, onToggle, message, title, children } = props;
  return (
    <Zoom duration={500}>
      <div className="fieldsight-popup open" style={{ zIndex: 99999 }}>
        <div
          className={`popup-body ${title === "Preview" ? "cropbody" : ""} ${
            title === "Warning" ? "sm-body" : ""
          } ${classname}`}
        >
          <div className="card">
            <div className="card-header main-card-header  sub-card-header">
              <h5>title</h5>

              <span
                className="popup-close"
                onClick={onToggle}
                tabIndex="0"
                role="button"
                onKeyDown={onToggle}
              >
                <i className="la la-close" />
              </span>
            </div>
            <div className="card-body">
              <div className="warning">
                <i className="la la-exclamation-triangle" />

                <p>{message}</p>
                <p>{children}</p>
              </div>
              <div className="warning-footer text-center"></div>
              <span className="col-4">
                <a
                  tabIndex="0"
                  role="button"
                  onKeyDown={onCancel}
                  className="fieldsight-btn rejected-btn"
                  onClick={onCancel}
                >
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </a>
              </span>

              <span className="col-4">
                <a
                  className="fieldsight-btn"
                  tabIndex="0"
                  role="button"
                  onKeyDown={onConfirm}
                  onClick={onConfirm}
                >
                  <FormattedMessage id="app.confirm" defaultMessage="Confirm" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default DeleteModal;

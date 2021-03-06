import React, { PureComponent } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import CustomCheckBox from "../../components/CustomCheckbox";

export default class UserRole extends PureComponent {
  render() {
    const {
      users,
      handleCheckUser,
      userList,
      onUsersChangeHandler
    } = this.props;

    return (
      <div className="col-md-6">
        <div className="custom-group">
          <div className="custom-group-append">
            <span className="custom-group-text">
              <i className="material-icons">search</i>
            </span>
          </div>
          <input
            className="custom-control"
            type="search"
            placeholder="Quick search user roles..."
            onChange={e => {
              onUsersChangeHandler(e);
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            height: `200px `
          }}
        >
          <PerfectScrollbar>
            <ul className="role-list">
              {users &&
                users.map(user => {
                  const filterList = userList.filter(i => i.code === user.code);
                  const isChecked = filterList && filterList[0] ? true : false;

                  return (
                    <li key={user.code}>
                      <CustomCheckBox
                        id={user.code}
                        label={user.label}
                        name={user.code}
                        checked={isChecked}
                        changeHandler={e => {
                          handleCheckUser(e, user);
                        }}
                      />
                    </li>
                  );
                })}
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}

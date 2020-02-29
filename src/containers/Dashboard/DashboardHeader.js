import React from 'react';
import { Dropdown } from 'react-materialize';

const profileStyle = {
  inDuration: 300,
  outDuration: 225,
  constrainWidth: false,
  hover: false,
  gutter: 0,
  coverTrigger: false,
  alignment: 'right',
};
const DashboardHeader = props => {
  const { onLogout } = props;

  return (
    <div className="page-topbar">
      <div className="navbar navbar-fixed">
        <nav className="navbar-main navbar-color nav-collapsible sideNav-lock  no-shadow">
          <div className="nav-wrapper">
            <ul className="breadcrumb">
              {/* <li>
                <a href="">home</a>
              </li>
              <li className="">
                <a href="">project</a>
              </li>
              <li className="current_page">Sydney stadium</li> */}
            </ul>
            <ul className="navbar-list right">
              {!(process.env.PLATFORM === 'production') && (
                <li>
                  <a
                    className=" notification-button"
                    data-target="notifications-dropdown"
                  >
                    <i className="material-icons">
                      notifications_none
                      <sup className="btn-floating pulse btn-small notification-badge">
                        5
                      </sup>
                    </i>
                  </a>
                </li>
              )}
              <li>
                {!(process.env.PLATFORM === 'production') ? (
                  <Dropdown
                    trigger={
                      <a
                        className="waves-effect waves-block waves-light profile-button"
                        data-target="profile-dropdown"
                      >
                        <span className="avatar-status avatar-online">
                          {/* <img src={pf} alt="avatar" /> */}
                        </span>
                      </a>
                    }
                    options={profileStyle}
                  >
                    <a className="grey-text ">
                      <i className="material-icons">person_outline</i>{' '}
                      Profile
                    </a>
                    <a className="grey-text ">
                      <i className="material-icons">help_outline</i>{' '}
                      Help
                    </a>
                    <a className="grey-text ">
                      <i className="material-icons">lock_outline</i>{' '}
                      Lock
                    </a>

                    <a className="grey-text " onClick={onLogout}>
                      <i className="material-icons">keyboard_tab</i>{' '}
                      Logout
                    </a>
                  </Dropdown>
                ) : (
                  <Dropdown
                    trigger={
                      <a
                        className="waves-effect waves-block waves-light profile-button"
                        data-target="profile-dropdown"
                      >
                        <span className="avatar-status avatar-online">
                          {/* <img src={pf} alt="avatar" /> */}
                        </span>
                      </a>
                    }
                    options={profileStyle}
                  >
                    <a className="grey-text " onClick={onLogout}>
                      <i className="material-icons">keyboard_tab</i>{' '}
                      Logout
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
            {/* < notifications-dropdown */}
          </div>
        </nav>
      </div>
    </div>
  );
};
export default DashboardHeader;

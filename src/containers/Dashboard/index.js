import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SideNav from './SideNav';
import DashboardHeader from './DashboardHeader';
import DashboardRoutes from './Routes';
import { logoutUsersRequest } from '../../actions/login';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUsersRequest()),
});

/* eslint react/prop-types: 0 */
class DashboardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: 'Projects',
      toggleClass: 'nav-lock',
      iconMenu: true,
    };
  }

  handleMenuChange = menu => {
    this.setState({
      isActive: menu,
    });
  };

  handleToggleClass = () => {
    this.setState(prevState => {
      if (prevState.toggleClass === 'nav-lock') {
        return {
          toggleClass: 'nav-collapsed',
          iconMenu: false,
        };
      }
      return {
        toggleClass: 'nav-lock',
        iconMenu: true,
      };
    });
  };

  handleMouseEnter = () => {
    this.setState(prevState => {
      if (prevState.toggleClass === 'nav-collapsed') {
        return {
          toggleClass: 'nav-expanded',
        };
      }
      return null;
    });
  };

  handleMouseLeave = () => {
    this.setState(prevState => {
      if (prevState.toggleClass === 'nav-expanded') {
        return {
          toggleClass: 'nav-collapsed',
        };
      }
      return null;
    });
  };
  onLogout = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <DashboardHeader onLogout={this.onLogout} />

        <SideNav
          data={this.state}
          handleMenuChange={this.handleMenuChange}
          handleToggleClass={this.handleToggleClass}
          handleMouseEnter={this.handleMouseEnter}
          handleMouseLeave={this.handleMouseLeave}
        />

        <div
          id="main"
          className={
            this.state.toggleClass == 'nav-lock' ? '' : 'main-full'
          }
        >
          <DashboardRoutes />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardLayout);

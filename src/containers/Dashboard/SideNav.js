import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import {
  CollectionItem,
  Collection,
  Collapsible,
  CollapsibleItem,
  Icon,
} from 'react-materialize';

const Menus = [
  {
    key: 1,
    navMenu: 'Projects',
    icons: 'assignment',
    link: '/dashboard',
  },

  ...(!(process.env.PLATFORM === 'production')
    ? [
        {
          key: 2,
          navMenu: 'Financials',
          icons: 'attach_money',
          link: '/dashboard',
        },
      ]
    : []),

  ...(!(process.env.PLATFORM === 'production')
    ? [
        {
          key: 3,
          navMenu: 'Project Schedule',
          icons: 'schedule',
          link: '/dashboard',
        },
      ]
    : []),

  ...(!(process.env.PLATFORM === 'production')
    ? [
        {
          key: 4,
          navMenu: 'Reports',
          icons: 'bar_chart',
          link: '/dashboard',
        },
      ]
    : []),

  { key: 5, navMenu: 'User Management', icons: 'how_to_reg' },

  ...(!(process.env.PLATFORM === 'production')
    ? [
        {
          key: 6,
          navMenu: 'Settings',
          icons: 'settings',
          link: '/dashboard',
        },
      ]
    : []),
];

const UserMgmtMenus = [
  {
    key: 1,
    navMenu: 'Users',
    icons: 'how_to_reg',
    link: '/dashboard/usermanagement',
  },
  {
    key: 2,
    navMenu: 'Roles',
    icons: 'how_to_reg',
    link: '/dashboard/usermanagement/roles',
  },
  {
    key: 3,
    navMenu: 'Clients',
    icons: 'how_to_reg',
    link: '/dashboard/usermanagement/clients',
  },
];

const SideNav = props => {
  const {
    data,
    handleMenuChange,
    handleToggleClass,
    handleMouseLeave,
    handleMouseEnter,
  } = props;
  return (
    <aside
      className={`sidenav-main nav-collapsible ${data.toggleClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="brand-sidebar">
        <h1 className="logo-wrapper">
          <Link className="brand-logo " to="/dashboard">
            <img src={logo} alt="" />
            <span className="logo-text hide-on-med-and-down">
              Varicon
            </span>
          </Link>
          <a
            className="navbar-toggler"
            onClick={handleToggleClass}
            style={{ cursor: 'pointer' }}
          >
            <i className="material-icons">
              {data.iconMenu ? 'menu' : 'close'}
            </i>
          </a>
        </h1>
      </div>
      <ul
        className="sidenav  leftside-navigation  collapsible sidenav-fixed"
        id="slide-out"
        data-menu="menu-navigation"
        data-collapsible="menu-accordion"
      >
        {Menus.map((menu, key) => {
          if (menu.navMenu !== 'User Management') {
            return (
              <li
                key={`nav_key_${key}`}
                className={
                  menu.navMenu == data.isActive
                    ? 'active bold'
                    : 'bold'
                }
                onClick={() => handleMenuChange(menu.navMenu)}
              >
                <Link
                  className="waves-effect waves-cyan "
                  to={menu.link}
                >
                  <Icon>{menu.icons}</Icon>
                  <span className="menu-title">{menu.navMenu}</span>
                </Link>
              </li>
            );
          } else {
            return (
              <li
                key={`nav_key_${key}`}
                className={
                  menu.navMenu == data.isActive
                    ? 'active bold'
                    : 'bold'
                }
              >
                <Collapsible>
                  <CollapsibleItem
                    icon={menu.icons}
                    header={
                      <span className="menu-title">
                        {menu.navMenu}
                      </span>
                    }
                  >
                    <Collection>
                      {UserMgmtMenus.map((submenu, idx) => {
                        return (
                          <CollectionItem
                            key={`sub_nav_key_${idx}`}
                            className={
                              submenu.navMenu == data.isActive
                                ? 'active bold'
                                : 'bold'
                            }
                            onClick={() =>
                              handleMenuChange(submenu.navMenu)
                            }
                          >
                            <Link
                              className="waves-effect waves-cyan "
                              to={submenu.link}
                            >
                              <span className="menu-title">
                                {submenu.navMenu}
                              </span>
                            </Link>
                          </CollectionItem>
                        );
                      })}
                    </Collection>
                  </CollapsibleItem>
                </Collapsible>
              </li>
            );
          }
        })}
      </ul>
      <a
        className="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only"
        href="#"
        data-target="slide-out"
      >
        <i className="material-icons">menu</i>
      </a>
    </aside>
  );
};
export default SideNav;

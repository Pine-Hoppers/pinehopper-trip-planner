import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';

// imports for Sidebar
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBIcon,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ handleClick, isLoggedIn, firstName }) => {
  if (isLoggedIn) {
    return (
      <div className="sidebar-css">
        <CDBSidebar textColor="#fff" backgroundColor="#4f514f">
          <CDBSidebarHeader prefix={<i className="fa-solid fa-bars"></i>}>
            <a
              href="/explore"
              className="text-decoration-none"
              style={{ color: 'inherit' }}
            >
              PINEHOPPER
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <CDBSidebarMenuItem icon="user" id="welcome-msg">
                Welcome, {firstName}
              </CDBSidebarMenuItem>

              <NavLink exact to="/explore" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="magnifying-glass">
                  Explore
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/wishlist" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="bookmark">
                  Wishlist
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/my-planner" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="calendar">
                  My Planner
                </CDBSidebarMenuItem>
              </NavLink>

              <CDBSidebarMenuItem
                icon="arrow-right-from-bracket"
                onClick={handleClick}
              >
                Logout
              </CDBSidebarMenuItem>
              {/* <a href="#" onClick={handleClick}>
                Logout
              </a> */}
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: '20px 5px',
              }}
            >
              <img src="pine.png" style={{ width: '60px' }} />
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  } else {
    return (
      <div id="no-sidebar">
        <h1>
          <Link className="top-bar-logo" to="/">
            PINEHOPPER
          </Link>
        </h1>
      </div>
    );
  }
};

// CONTAINER
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    firstName: state.auth.firstName,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Sidebar);

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

const Sidebar = ({ handleClick, isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <div className="sidebar-css">
        <CDBSidebar textColor="#fff" backgroundColor="#344E41">
          <CDBSidebarHeader prefix={<i className="fa-solid fa-bars"></i>}>
            <a
              href="/home"
              className="text-decoration-none"
              style={{ color: 'inherit' }}
            >
              Sidebar
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/home" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="house">Home</CDBSidebarMenuItem>
              </NavLink>
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
              <NavLink
                exact
                to="/hero404"
                target="_blank"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="exclamation-circle">
                  404 page
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: '20px 5px',
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  } else {
    return (
      <div id="navbar">
        <h1>pinehopper</h1>
        {/* The navbar will show these links before you log in */}
        {/* <nav>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav> */}
        <hr />
      </div>
    );
  }
};

// CONTAINER
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
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

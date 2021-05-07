import React, { useSelector } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styles from './navbar.module.css';

const NavBar = ({ setAuthenticated }) => {
  // const user = useSelector(state => state.session.user)
  return (
    <nav className={styles.nav}>
      <ul>
        <li >
          <NavLink to="/" exact={true} className={styles.nav_list_item} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
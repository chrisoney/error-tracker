import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import LogoutButton from '../auth/LogoutButton';
import styles from './navbar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);

  // Logged In
  if (sessionLoaded && user) return (
    <nav className={styles.nav}>
      <ul>
        <li >
          <NavLink to="/home" exact={true} className={`${styles.nav_list_item} fas fa-trash`}activeClassName="active">
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} className={styles.nav_list_item} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
  // Logged Out
  return (
    <nav className={styles.nav}>
      <ul>
        <li >
        <NavLink to="/" exact={true} className={`${styles.nav_list_item} fas fa-trash`}activeClassName="active">
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" className={styles.nav_list_item} exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
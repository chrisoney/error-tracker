import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from './home.module.css';

import { fetchAllModules } from '../../store/module';
import { fetchAllErrors } from '../../store/error'

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const modules = useSelector(state => state.modules)

  useEffect(() => {
    dispatch(fetchAllModules())
    dispatch(fetchAllErrors())
  }, [dispatch])

  // Logged In
  return (
    <div className={styles.home_container}>
      <ul>
        {Object.values(modules).map(module => {
          return (
            <Link key={module.id} to={`/modules/${module.id}`}>
              <li>{module.name}</li>
            </Link>
          )
        })}
      </ul>
    </div>
  );
  
}

export default Home;
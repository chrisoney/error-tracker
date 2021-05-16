import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from './home.module.css';


import ErrorPreview from '../Error/error_preview';

import { fetchAllModules, addNewModule } from '../../store/module';
import { fetchAllErrors } from '../../store/error';
import { fetchAllMessages } from '../../store/message';
import { changePage } from '../../store/ui';

const Home = () => {
  const dispatch = useDispatch();

  const errors = useSelector(state => state.errors)
  
 
  const [randomNum, setRandomNum] = useState(null)



  useEffect(() => {
    // dispatch(fetchAllModules())
    dispatch(fetchAllErrors())
    // dispatch(fetchAllMessages())
    dispatch(changePage(0)) // Just 0 for now for home
    setRandomNum(Math.floor(Math.random() * 100))

  }, [dispatch])

  // Logged In
  return (
    <div className={styles.home_container}>
      <h1 className={styles.error_feed_title}>Recent Errors {randomNum}</h1>
      <ul className={styles.error_list}>
        {Object.values(errors).sort((a, b) => {
          return b.id - a.id;
        }).map(error => {
          return (
            <li
              className={styles.error_container}
              key={error.id}
            >
              <ErrorPreview error={error} />
            </li>
          )
        })}
      </ul>
    </div>
  );
  
}

export default Home;
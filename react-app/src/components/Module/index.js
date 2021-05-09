import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Link,  useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { openModal, setCurrent, setProps } from '../../store/modal';
import { fetchAllModules } from '../../store/module';
import { fetchAllErrors } from '../../store/error';
import ImagePopup from '../Modal/image_popup';
import ErrorForm from '../Error/error_form';

import styles from './module.module.css';

const Home = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors)

  const showImage = (e) => {
    dispatch(setCurrent(ImagePopup));
    dispatch(setProps({imageSrc: e.target.src }))
    dispatch(openModal());
  };
  const newError = (e) => {
    dispatch(setCurrent(ErrorForm));
    dispatch(setProps({module_id: id }))
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(fetchAllModules())
    dispatch(fetchAllErrors())
  }, [dispatch])

  return (
    <>
      <h1>mod page: {id}</h1>
      <div className={styles.button_container}>
        <span>Back</span>
        <button className={styles.open_error_modal} onClick={newError}>
          New Error
        </button>
      </div>
      <div className={styles.right_main}>
        <h1 className={styles.error_feed_title}>Errors</h1>
        <ul className={styles.error_list}>
          {Object.values(errors).filter(error => {
            return error.module.id === parseInt(id)
          }).sort((a, b) => {
            return b.id - a.id;
          }).map(error => {
            return (
              <li
                className={styles.error_container}
                key={error.id}
              >
                <span className={styles.error_title}>{error.title}</span>
                <span className={styles.error_desc}>{error.description}</span>
                <div className={styles.img_container}>
                  {error.images.map((image, idx) => {
                    return (
                      <img
                        key={idx}
                        className={styles.err_img}
                        onClick={showImage}
                        src={image}
                      />
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Home;
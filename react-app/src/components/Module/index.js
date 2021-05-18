import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { openModal, setCurrent, setProps } from '../../store/modal';
import { fetchAllModules } from '../../store/module';
import { fetchAllErrors } from '../../store/error';
import { changePage } from '../../store/ui';

import ErrorForm from '../Error/error_form';
import ErrorPreview from '../Error/error_preview';

import styles from './module.module.css';

const Module = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors)
  
  const newError = (e) => {
    dispatch(setCurrent(ErrorForm));
    dispatch(setProps({module_id: id }))
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(fetchAllModules())
    dispatch(fetchAllErrors())
  }, [dispatch])

  useEffect(() => {
    dispatch(changePage(parseInt(id)))
  }, [dispatch, id])

  return (
    <div className={styles.module_page_container}>
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
              <ErrorPreview error={error} />
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Module;
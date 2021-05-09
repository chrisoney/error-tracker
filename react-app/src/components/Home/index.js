import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from './home.module.css';

import { setCurrent, setProps, openModal } from '../../store/modal'
import ImagePopup from '../Modal/image_popup';

import { fetchAllModules, addNewModule } from '../../store/module';
import { fetchAllErrors } from '../../store/error'

const Home = () => {
  const dispatch = useDispatch();
  const modules = useSelector(state => state.modules)
  const errors = useSelector(state => state.errors)
  const [name, setName] = useState('')
  const [revealForm, setRevealForm] = useState(false)
  const [randomNum, setRandomNum] = useState(null)

  function submitNewModule(){
    dispatch(addNewModule(name))
  }

  const showImage = (e) => {
    dispatch(setCurrent(ImagePopup));
    dispatch(setProps({imageSrc: e.target.src }))
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(fetchAllModules())
    dispatch(fetchAllErrors())
    setRandomNum(Math.floor(Math.random() * 100))

  }, [dispatch])

  // Logged In
  return (
    <div className={styles.home_container}>
      <div className={styles.left_aside}>
        <ul>
          {Object.values(modules).map(module => {
            return (
              <Link
                key={module.id}
                to={`/modules/${module.id}`}
              >
                <li className={styles.module_link}>{module.name}</li>
              </Link>
            )
          })}
          {!revealForm &&
            <li className={styles.module_link}
              title="Add a new module"
              onClick={() => setRevealForm(!revealForm)}
            >Add Module</li>
          }
        </ul>
        {revealForm &&
          <div className={styles.new_mod_form}>
            <i className={`fas fa-trash ${styles.new_mod_button}`}
              onClick={() => setRevealForm(!revealForm)}
            />
            <input
              type="text"
              value={name}
              placeholder="New Mod"
              className={styles.new_mod_input}
              onChange={(e) => setName(e.target.value)}
            />
            <i className={`fas fa-plus ${styles.new_mod_button}`}
              onClick={submitNewModule}
            />

          </div>
        }
      </div>
      <div className={styles.right_main}>
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
                <span className={styles.error_title}>{error.title}</span>
                <span className={styles.error_desc}>{error.description}</span>
                <div className={styles.img_container}>
                  {error.images.map((image, idx) => {
                    return (
                      <img
                        key={idx}
                        className={styles.err_img}
                        src={image}
                        onClick={showImage}
                      />
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
  
}

export default Home;
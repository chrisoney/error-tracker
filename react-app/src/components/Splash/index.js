import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from './splash.module.css';

import { login } from '../../store/session';

const Splash = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const sessionLoaded = useSelector(state => state.session.loaded);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .catch(err => setErrors(err.errors));
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (errors.length > 0) {
    return <Redirect to={{
      pathname: "/login",
      state: { errors: errors }
    }}/>;
  }

  if (sessionLoaded && user) {
    return <Redirect to="/home" />;
  }
  
  return (
    <div className={styles.home_container}>
      <h1 className={styles.header}>Welcome to Error Tracker</h1>
      <span className={styles.short_desc}>
        This is just a skeleton of a project right now, but it could become something more!
      </span>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={onLogin}>
          <h2>Log In</h2>
          <div>
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className={styles.preview_container}></div>
      <div className={styles.preview_container}></div>
      <div className={styles.about_section}>
        <div className={styles.about_section_left}>
          <a
            href='https://github.com/chrisoney'
            className={`${styles.about_icon} fab fa-github`}
          />
          <a
            href='https://www.linkedin.com/in/christopher-oney-317b84132/'
            className={`${styles.about_icon} fab fa-linkedin`}
          />
        </div>
        <div className={styles.about_section_right}>ErrorTracker 2021</div>
      </div>
    </div>
  );
}

export default Splash;
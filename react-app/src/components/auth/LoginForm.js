import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../store/session";

import styles from './auth.module.css';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    if (props.location.state && props.location.state.errors) {
      setErrors(props.location.state.errors)
    }
  }, [dispatch])

  if (sessionLoaded && user) {
    return <Redirect to='/home' />;
  }


  return (
    <form className={styles.form} onSubmit={onLogin}>
      <div>
        {errors.map((error, idx) => (
          <div className={styles.error} key={idx}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;

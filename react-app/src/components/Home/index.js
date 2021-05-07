import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from './home.module.css';

import { login } from '../../store/session';

const Home = () => {
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
  console.log(sessionLoaded, user)

  if (errors.length > 0) {
    return <Redirect to={{
      pathname: "/login",
      state: { errors: errors }
    }}/>;
  }
  // Logged In
  if (sessionLoaded && user) return (
    <div className={styles.home_container}>
    </div>
  );
  // Logged Out
  return (
    <div className={styles.home_container}>
      <div></div>
      <form onSubmit={onLogin}>
      <div>
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
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
    </div>
  );
}

export default Home;
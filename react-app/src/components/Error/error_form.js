import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addNewError } from "../../store/error";
import { closeModal } from '../../store/modal';

import styles from './error.module.css';

const ErrorForm = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const module_id = useSelector(state => state.modal.props.module_id)
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(addNewError(
      title,
      description,
      user.id,
      parseInt(module_id)
    ))
    .then(() => dispatch(closeModal()))
    .catch(err => setErrors(err.errors));
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };


  return (
    <form className={styles.form} onSubmit={onLogin}>
      <div>
        {errors.map((error, idx) => (
          <div className={styles.error} key={idx}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={updateDescription}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ErrorForm;

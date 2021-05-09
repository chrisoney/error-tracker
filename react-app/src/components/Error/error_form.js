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
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    dispatch(addNewError(
      title,
      description,
      user.id,
      parseInt(module_id),
      images
    ))
      .then(() => {
        setImageLoading(false);
        dispatch(closeModal())
      })
      .catch(err => {
        setImageLoading(false);
        setErrors(err.errors)
      });
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateImages = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file)
    setImageUrls([...imageUrls, url])
    setImages([...images, file]);
}

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
      </div>
      {imageUrls.map((image, idx) => {
        return <img key={idx} className={styles.preview_image} src={image} />
      })}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={updateImages}
      />
      {(imageLoading)&& <p>Loading...</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ErrorForm;

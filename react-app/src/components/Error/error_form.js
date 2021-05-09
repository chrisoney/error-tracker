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
        <input
          name="title"
          className={styles.title}
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle}
        />
      </div>
      <div>
        <textarea
          name="description"
          placeholder="Description"
          className={styles.description}
          value={description}
          onChange={updateDescription}
        />
      </div>
      <div className={styles.image_container}>
        {imageUrls.map((image, idx) => {
          return <img key={idx} className={styles.preview_image} src={image}/>
        })}
      </div>
      {(imageLoading) && <p className={styles.loading}>Loading...</p>}
      <label htmlFor="upload-box" className="upload-label-box">
        <div className={styles.upload_container}>
          <div className={`${styles.camera_icon} fas fa-camera`} />
          <div className={styles.image_label}>Add images</div>
        </div>
        <input
          className={styles.upload_input}
          type="file"
          accept="image/*"
          id="upload-box"
          value=""
          onChange={updateImages}
          multiple
        />
      </label>
      {/* <input
        className={styles.image_upload_input}
        type="file"
        accept="image/*"
        multiple
        onChange={updateImages}
      /> */}
      <div className={styles.button_container}>
        <button className={styles.form_button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ErrorForm;

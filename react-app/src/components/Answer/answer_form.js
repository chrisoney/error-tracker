import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './answer.module.css';

import { addNewAnswer } from '../../store/answer';

const AnswerForm = ({error_id}) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    dispatch(addNewAnswer(
      description,
      user.id,
      parseInt(error_id),
      images
    ))
      .then(() => {
        setImageLoading(false);
      })
      .catch(err => {
        setImageLoading(false);
        setErrors(err.errors)
      });
  };
  
  const handleDragEnter = e => {
    e.preventDefault();
    e.target.classList.add(styles.file_hover);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...urls])
    setImages([...images, ...files]);

  };

  const updateImages = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file)
    setImageUrls([...imageUrls, url])
    setImages([...images, file]);
  }

  return (
    <form className={styles.answer_form} onSubmit={onSubmit}>
      <h3 className={styles.answer_form_header}>
        Submit an answer for this error
      </h3>
      <div>
        {errors.map((error, idx) => (
          <div className={styles.error} key={idx}>{error}</div>
        ))}
      </div>
      <div className={styles.answer_form_input_section}>
        <textarea
          className={styles.description_input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label
        htmlFor="upload-box"
        className="upload-label-box"
        onDrop={(e) => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        >
          <div className={styles.upload_container}>
            <div className={`${styles.camera_icon} fas fa-camera`} />
            <div className={styles.image_label}>Drag and drop or click here to select image files</div>
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
      <div className={styles.button_container}>
        <button className={styles.form_button} type="submit">
          Submit
        </button>
      </div>
      </div>
      {(imageLoading) && <p className={styles.loading}>Loading...</p>}
      <div className={styles.answer_form_img_previews}>
        {imageUrls.map((image, idx) => {
          return <img key={idx} alt="" className={styles.preview_image} src={image}/>
        })}
      </div>
    </form>
  )
}

export default AnswerForm
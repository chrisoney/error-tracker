import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './error.module.css';

import { setCurrent, setProps, openModal } from '../../store/modal'
import ImagePopup from '../Modal/image_popup';

const ErrorPreview = ({error}) => {
  const dispatch = useDispatch();

  const showImage = (e) => {
    dispatch(setCurrent(ImagePopup));
    dispatch(setProps({imageSrc: e.target.src }))
    dispatch(openModal());
  };

  return (
    <div className={styles.single_error_preview_container}>
      <div className={styles.error_preview_header}>
        <span className={styles.error_preview_title}>{error.title}</span>
        <i className={`fas fa-arrow-circle-right ${styles.error_preview_navigate}`}/>
      </div>
      <div className={styles.error_preview_body}>
        <span className={styles.error_preview_desc}>{error.description}</span>
        <div className={styles.error_previewimg_container}>
          {error.images.map((image, idx) => {
            return (
              <img
                key={idx}
                className={styles.err_preview_img}
                src={image}
                onClick={showImage}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ErrorPreview;
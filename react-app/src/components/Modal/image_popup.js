import React from 'react';
import { useSelector } from 'react-redux'
import styles from './modal.module.css';

const ImagePopup = (props) => {
  const src = useSelector(state => state.modal.props.imageSrc)

  return (
    <>
      <img src={src} className={styles.modal_img_popup} />
    </>
  )
}

export default ImagePopup;
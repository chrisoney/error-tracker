import React from 'react';
import { useDispatch } from 'react-redux';

import { setCurrent, setProps, openModal } from '../../store/modal';
import ImagePopup from '../Modal/image_popup';

import styles from './answer.module.css';


const Answer = ({ answer }) => {
  const dispatch = useDispatch();

  const showImage = (e) => {
    dispatch(setCurrent(ImagePopup));
    dispatch(setProps({imageSrc: e.target.src }))
    dispatch(openModal());
  };

  return (
    <li key={`answer-${answer.id}`} className={styles.ans_list_item}>
      <span className={styles.ans_user}>{answer.user_username}</span>
      <span className={styles.ans_desc}>{answer.description}</span>
      <div className={styles.ans_image_container}>
        {answer.images.map((img,idx) => {
          return (
            <img
              alt=""
              key={`ans-${answer.id}-img-${idx}`}
              className={styles.ans_image}
              src={img}
              onClick={showImage}
            />
          )
        })}
      </div>
    </li>
  )
}

export default Answer;
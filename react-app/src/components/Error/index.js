import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchErrorAnswers } from '../../store/answer';
import { fetchSingleError } from '../../store/error';
import { setCurrent, setProps, openModal } from '../../store/modal'
import ImagePopup from '../Modal/image_popup';

import styles from './error.module.css';

const Error = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const [error, setError] = useState(null)
  // const [answers, setAnswers] = useState([])
  const error = useSelector(state => state.errors[id])
  const answers = useSelector(state => Object.values(state.answers))

  useEffect(() => {
    dispatch(fetchSingleError(id));
    dispatch(fetchErrorAnswers(id));
  }, [dispatch, id])

  const showImage = (e) => {
    dispatch(setCurrent(ImagePopup));
    dispatch(setProps({imageSrc: e.target.src }))
    dispatch(openModal());
  };

  return (
    <div className={styles.error_page_container}>
        <div className={styles.main_error_container}>
        <div className={styles.error_page_header}>
          <h1 className={styles.error_page_title}>{error?.title}</h1>
        </div>
        <div className={styles.error_page_content}>
          <div className={styles.error_page_body}>
            {error?.description}
          </div>
          <div className={styles.error_page_image_container}>
              {error?.images.map((img,idx) => {
                return (
                  <img
                    alt=""
                    key={`err-img-${idx}`}
                    className={styles.error_page_image}
                    src={img}
                    onClick={showImage}
                  />
                )
              })}
            </div>
        </div>
      </div>
      <form className={styles.answer_form}>
        <h3 className={styles.answer_form_header}>
          Submit an answer for this error
        </h3>
        <div className={styles.answer_form_input_section}>
          {/* Description input */}
          {/* Image input */}
        </div>
        <div className={styles.answer_form_img_previews}>
          {/* Image previews modeled after error form */}
        </div>
      </form>
      <ul className={styles.error_page_answer_list}>
        {answers?.map(ans => {
          return (
            <li key={`answer-${ans.id}`} className={styles.ans_list_item}>
              <span className={styles.ans_user}>{ans.user_username}</span>
              <span className={styles.ans_desc}>{ans.description}</span>
              <div className={styles.ans_image_container}>
                {ans.images.map((img,idx) => {
                  return (
                    <img
                      alt=""
                      key={`ans-${ans.id}-img-${idx}`}
                      className={styles.ans_image}
                      src={img}
                      onClick={showImage}
                    />
                  )
                })}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Error;
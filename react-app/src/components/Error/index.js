import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchErrorAnswers } from '../../store/answer';
import { fetchSingleError } from '../../store/error';

import styles from './error.module.css';

const Error = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const [error, setError] = useState(null)
  // const [answers, setAnswers] = useState([])
  const error = useSelector(state => state.errors[id])
  const answers = useSelector(state => Object.values(state.answers))

  useEffect(() => {
    console.log('-------------------------',id)
    dispatch(fetchSingleError(id));
    dispatch(fetchErrorAnswers(id));
  }, [])

  return (
    <div className={styles.error_page_container}>
      <div className={styles.error_page_header}>
        <h1 className={styles.error_page_title}>{error?.title}</h1>
      </div>
      <div className={styles.error_page_content}>
        <div className={styles.error_page_body}>
          {error?.description}
          <div className={styles.error_page_image_container}>
            {error?.images.map((img,idx) => {
              return (
                <img
                  key={`err-img-${idx}`}
                  className={styles.error_page_image}
                  src={img}
                />
              )
            })}
          </div>
        </div>
        {/* New Answer form */}
        <ul className={styles.error_page_answer_list}>
          {answers?.map(ans => {
            return (
              <li key={`answer-${ans.id}`} className={styles.ans_list_item}>
                <span className={styles.ans_desc}>{ans.description}</span>
                <div className={styles.ans_image_container}>
                  {ans.images.map((img,idx) => {
                    return (
                      <img
                        key={`ans-${ans.id}-img-${idx}`}
                        className={styles.ans_image}
                        src={img}
                      />
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Error;
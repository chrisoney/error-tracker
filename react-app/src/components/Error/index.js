import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchErrorAnswers } from '../../store/answer';

import styles from './error.module.css';

const Error = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const error = useSelector(state => state.errors[id])
  const answers = useSelector(state => state.answers)

  useEffect(() => {
    dispatch(fetchErrorAnswers(id))

  }, [dispatch])

  return (null)
}

export default Error;
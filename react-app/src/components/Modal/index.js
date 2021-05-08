import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../store/modal';

import styles from './modal.module.css';

export default function Modal () {
  const dispatch = useDispatch();

  const mount = useSelector(state => state.modal.mount);
  const display = useSelector(state => state.modal.display);
  const Current = useSelector(state => state.modal.current);

  const onClose = () => {
    dispatch(closeModal());
  };

  return mount && display && ReactDOM.createPortal(
    <div onClick={onClose} className={styles.modal_background}>
      <div
        onClick={e => e.stopPropagation()}
        className={styles.modal_content}
      >
        <Current />
      </div>
    </div>,
    mount);
}
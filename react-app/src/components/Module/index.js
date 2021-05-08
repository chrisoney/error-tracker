import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Link,  useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from './module.module.css';

const Home = () => {
  const { id } = useParams();
  const modules = useSelector(state => state.modules)
  const [module, setModule] = useState({})

  Object.values(modules).forEach(module => {
      console.log(id)
      console.log(module)
  })
  return (
    <>
      <h1>mod page: {id}</h1>
    </>
  )
}

export default Home;
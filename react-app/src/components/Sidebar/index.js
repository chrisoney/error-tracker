import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllModules, addNewModule } from '../../store/module';

import styles from './sidebar.module.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const modules = useSelector(state => state.modules);
  const page = useSelector(state => state.ui.page)
  const [revealForm, setRevealForm] = useState(false);
  const [selected, setSelected] = useState(0)
  const [name, setName] = useState('')

  function submitNewModule(){
    dispatch(addNewModule(name))
  }

  useEffect(() => {
    dispatch(fetchAllModules())
    // dispatch(fetchAllErrors())
    // dispatch(fetchAllMessages())
    
  }, [dispatch])

  useEffect(() => {
    setSelected(page)
  }, [page])

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.modules_header}>Modules</div>
      <ul>
        <Link
          key={0}
          className={styles.link_ele}
          to={`/home`}
          // onClick={() => setSelected(0)}
        >
          <li
            className={styles.module_link}
          >All Modules</li>
          {0 === selected ? <span className={styles.highlight}/>:""}
        </Link>
        {Object.values(modules).map(module => {
          return (
            <Link
              key={module.id}
              className={styles.link_ele}
              to={`/modules/${module.id}`}
              // onClick={() => setSelected(module.id)}
            >
              <li
                className={styles.module_link}
              >{module.name}</li>
              {module.id === selected ? <span className={styles.highlight}/>:""}
            </Link>
          )
        })}
        {!revealForm &&
          <li className={styles.module_link}
            title="Add a new module"
            onClick={() => setRevealForm(!revealForm)}
          >Add Module</li>
        }
      </ul>
      {revealForm &&
        <div className={styles.new_mod_form}>
          <i className={`fas fa-trash ${styles.new_mod_button}`}
            onClick={() => setRevealForm(!revealForm)}
          />
          <input
            type="text"
            value={name}
            placeholder="New Mod"
            className={styles.new_mod_input}
            onChange={(e) => setName(e.target.value)}
          />
          <i className={`fas fa-plus ${styles.new_mod_button}`}
            onClick={submitNewModule}
          />

        </div>
      }
    </div>
  )
}

export default Sidebar;
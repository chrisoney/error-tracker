import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllModules, addNewModule } from '../../store/module';

import styles from './sidebar.module.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const modules = useSelector(state => state.modules);
  const [revealForm, setRevealForm] = useState(false);
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')

  function submitNewModule(){
    dispatch(addNewModule(name))
  }

  useEffect(() => {
    dispatch(fetchAllModules())
    // dispatch(fetchAllErrors())
    // dispatch(fetchAllMessages())
    
  }, [dispatch])
  console.log(selected)
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.modules_header}>Modules</div>
      <ul>
        {Object.values(modules).map(module => {
          return (
            <Link
              key={module.id}
              className={styles.link_ele}
              to={`/modules/${module.id}`}
              onClick={() => setSelected(module.id)}
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
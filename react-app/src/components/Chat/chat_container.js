import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '.';
import styles from './chat.module.css';
const ChatContainer = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState([]);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  function openNewChat(e, user) {
    e.preventDefault();
    setOpen([...open, user]);
  }

  const openChats = open.map((user) => {
    return (
      <>
        <div className={styles.open_chat_container}>
          <div className={styles.open_chat_username}>
            {user.username}
          </div>
          <Chat id={ user.id } username={ user.username } />
        </div>
      </>
    )
  })

  const userList = users.map((user) => {
    if (user.id !== sessionUser.id) return (
      <li key={`chat-userlist-${user.id}`} onClick={(e)=>openNewChat(e,user)}>
        <div>{user.username}</div>
      </li>
    );
  });

  return (
    <div className={styles.chat_container}>
      {openChats}
      <div className={styles.user_list_container}>
        <ul className={styles.user_list}>
          {userList}
        </ul>
      </div>
    </div>
  )
}

export default ChatContainer;
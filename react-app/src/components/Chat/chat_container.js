import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './chat.module.css';
import { io } from 'socket.io-client';
import {
  fetchAllMessages,
  createNewMessage,
  updateMessages,
  updateLastMessage
} from '../../store/message';

let socket;

const ChatContainer = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState([]);
  const [online, setOnline] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [listReveal, setListReveal] = useState(false);
  
  const [chatInput, setChatInput] = useState("");
  const oldMessages = useSelector(state => state.messages.messages);
  const [messages, setMessages] = useState([]);
  
  const sessionUser = useSelector(state => state.session.user);
  
  const msgContainer = useRef(null);
  const selectedUserRef = useRef(selectedUser)
  const [newAlerts, setNewAlerts] = useState({})
  
  useEffect(() => {
    selectedUserRef.current = selectedUser
  }, [selectedUser])

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io("/private");
    socket.on('connect', function() {
      socket.emit('connected', { userId: sessionUser.id})
    });
    socket.on('connected', (data) => {
      setOnline(Object.keys(data).map(key => parseInt(key)))
    })

    
    socket.on("chat", (chat) => {
      setMessages(messages => [...messages, chat])
      if (msgContainer.current) msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
      if (selectedUserRef.current === chat.recipientId) {
        dispatch(updateLastMessage(chat.senderId, chat.recipientId))
      }
      //else?
      setNewAlerts(newAlerts => {
        const id = chat.senderId;
        if (selectedUserRef.current === id) return newAlerts
        const temp = {...newAlerts}
        if (!temp[id]) temp[id] = 0
        temp[id]++
        return temp
      })
    })
    socket.on('disconnect', (data) => {
      console.log(data)
      setOnline(Object.keys(data).map(key => parseInt(key)))
    });
    
    // when component unmounts, disconnect
    return (() => {
      console.log(sessionUser)
      // socket.emit('disconnect', { userId: sessionUser.id})
      // socket.on('disconnect', function() {
      // });
      socket.disconnect()
    })
  }, [dispatch, sessionUser])

  useEffect(() => {
    dispatch(fetchAllMessages())
  }, [dispatch, selectedUser])

  useEffect(() => {
    const filteredMessages = oldMessages.filter(msg => {
      return msg.sender_id === selectedUser || msg.recipient_id === selectedUser
    }).map((msg) => {
      return {
        sender_id: msg.sender_id,
        user: msg.sender_username,
        msg: msg.body
      }
    })
    setMessages([...filteredMessages])
  }, [oldMessages, selectedUser])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      const data = responseData.users;
      setUsers(data);
    }
    fetchData();
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  const sendChat = (e) => {
    e.preventDefault()
    dispatch(createNewMessage(chatInput, selectedUser))
    socket.emit("chat", { senderId: sessionUser.id, recipientId: selectedUser, user: sessionUser.username, msg: chatInput });
    setChatInput("")
  }

  function openNewChat(e, user) {
    const ids = open.map(user => user.id)
    e.preventDefault();
    if (ids.includes(user.id)) {
      const idx = ids.indexOf(user.id);
      setOpen([...open.slice(0,idx), ...open.slice(idx+1, open.length)])
    } else {
      setOpen([...open, user]);
    }
  }

  // Generating user list
  const userList = users.map((user) => {
    if (user.id !== sessionUser.id) return (
      <li
        key={`chat-userlist-${user.id}`}
        onClick={(e) => openNewChat(e, user)}
        className={styles.user_list_user_container}
      >
        <i className={`fa-circle ${styles.status} ${online.includes(user.id)
          ? 'fas' : 'far'}`} />
        <div>{user.username}</div>
      </li>
    );
    else return null;
  });

  function unreadCount(id) {
    if (id === selectedUser) return 0;
    const messages = oldMessages.filter(msg => (msg.sender_id === id && msg.recipient_id === sessionUser.id) && msg.unread)
    // console.log(messages)
    const count = messages.length;
    // console.log(count, newAlerts[id])
    return count
  }

  function openChatMessages(id) {
    setNewAlerts(newAlerts => {
      const temp = {...newAlerts}
      if (temp[id]) temp[id] = 0
      return temp
    })

    setSelectedUser(selectedUser === id ? null : id)
    // if (msgContainer.current) msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
    const messages = oldMessages.filter(msg => msg.sender_id === id && msg.recipient_id === sessionUser.id && msg.unread)
    const ids = messages.map(msg => msg.id)
    console.log(ids)
    dispatch(updateMessages(ids))
    dispatch(fetchAllMessages())
  }

  return (
    <div className={styles.chat_container}>
      <div className={styles.open_chats_container}>
        {open.map((user, idx) => {
          return (
            <div
              key={`open-chat-${idx}`}
              className={styles.open_chat_container}
            >
              <div
                className={`${styles.open_chat_username_container}
                ${user.id === selectedUser ? styles.selected_chat : null}`}
                onClick={() => openChatMessages(user.id)}
              >
                <span className={styles.open_chat_username}>
                  {user.username}
                </span>
                <span className={styles.open_chat_notifications}>
                  {(unreadCount(user.id) +
                    (newAlerts[user.id]) || null)}
                </span>
              </div>
              {user.id === selectedUser
                ? (<div className={styles.solo_chat_container}>
                    {/* <div className={styles.chat_positioner}> */}
                    <div ref={msgContainer}
                      className={styles.message_container}>
                        {messages.map((msg, idx) => (
                          <div
                            className={`${styles.msg} 
                              ${msg.sender_id === sessionUser.id ? styles.current_user :null}`}
                            key={idx}
                          >{msg.msg}</div>
                        ))}
                      </div>
                      <form onSubmit={sendChat} className={styles.chat_form}>
                        <input
                          value={chatInput}
                          className={styles.chat_input}
                          onChange={updateChatInput}
                        />
                        <button type="submit" className={styles.chat_button}>Send</button>
                      </form>
                    {/* </div> */}
                  </div>)
                : null}
            </div>
        )
      })}
      </div>
      <div className={styles.user_list_container}>
        <div
          className={styles.user_list_label}
          onClick={() => setListReveal(!listReveal)}
        >
          <div
            className={`${styles.user_menu_button}
            ${listReveal ? styles.menu_open : "styles.open"}`}
          >
            <span className={styles.user_menu_bar}></span>
            <span className={styles.user_menu_bar}></span>
            <span className={styles.user_menu_bar}></span>
          </div>
          <div className={styles.list_open}>User List</div>
        </div>
        {listReveal && <ul className={styles.user_list}>
          {userList}
        </ul>}
      </div>
    </div>
  )
}

export default ChatContainer;
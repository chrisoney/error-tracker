import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '.';
import styles from './chat.module.css';
import { io } from 'socket.io-client';
import { fetchAllMessages, createNewMessage } from '../../store/message';

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

  // socket = io("/private");

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io("/private");
    // socket.on("join", (data))
    socket.on('connect', function() {
      socket.emit('connected', { userId: sessionUser.id})
    });
    socket.on('connected', (data) => {
      setOnline(Object.keys(data).map(key => parseInt(key)))
    })
    socket.on("chat", (chat) => {
      setMessages(messages => [...messages, chat])
    })
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect("/private")
      socket.on('disconnect', function() {
        socket.emit('disconnected', { userId: sessionUser.id})
      });
    })
  }, [])

  useEffect(() => {
    dispatch(fetchAllMessages())
  }, [dispatch, selectedUser])

  useEffect(() => {

    const filteredMessages = oldMessages.filter(msg => {
      return msg.sender_id === selectedUser || msg.recipient_id === selectedUser
    }).map((msg) => {
      return {
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
      setUsers(responseData.users);
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
        <i className={`fas fa-circle ${styles.status} ${online.includes(user.id)
          ? styles.online : ''}`} />
        <div>{user.username}</div>
      </li>
    );
  });

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
                className={styles.open_chat_username}
                onClick={() => setSelectedUser(selectedUser === user.id
                  ? null : user.id)}
              >
                {user.username}
              </div>
              {user.id === selectedUser
                ? (<div className={styles.solo_chat_container}>
                    <div className={styles.message_container}>
                      {messages.map((msg, idx) => (
                        <div
                          className={styles.msg}
                          key={idx}
                        >{`${msg.user}: ${msg.msg}`}</div>
                      ))}
                    </div>
                    <form onSubmit={sendChat}>
                      <input
                        value={chatInput}
                        onChange={updateChatInput}
                      />
                      <button type="submit">Send</button>
                    </form>
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
        >User List</div>
        {listReveal && <ul className={styles.user_list}>
          {userList}
        </ul>}
      </div>
    </div>
  )
}

export default ChatContainer;
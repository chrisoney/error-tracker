import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { fetchAllMessages } from '../../store/message';

import styles from './chat.module.css';
let socket;

const Chat = (props) => {

  const id = parseInt(props.id);
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState("");
  const oldMessages = useSelector(state => state.messages.messages);
  const [messages, setMessages] = useState([]);
  const user = useSelector(state => state.session.user);
  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io("/private");
    // socket.on("join", (data))
    socket.on('connect', function() {
      socket.emit('connected', { userId: user.id})
    });
    socket.on('connected', (data) => {
      console.log(data)
    })
    socket.on("chat", (chat) => {
      setMessages(messages => [...messages, chat])
    })
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect("/private")
      socket.on('disconnect', function() {
        socket.emit('disconnected', { userId: user.id})
      });
    })
  }, [user.id])

  useEffect(() => {
    dispatch(fetchAllMessages())
  }, [dispatch])


  useEffect(() => {
    const filteredMessages = oldMessages.filter(msg => {
      return msg.sender_id === id || msg.recipient_id === id
    }).map((msg) => {
      return {
        user: msg.sender_username,
        msg: msg.body
      }
    })
    setMessages([...filteredMessages])
  }, [oldMessages, id])


  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  const sendChat = (e) => {
    e.preventDefault()
    // dispatch(createNewMessage(chatInput, props.id))
    socket.emit("chat", { senderId: user.id, recipientId: id, user: user.username, msg: chatInput });
    setChatInput("")
  }

  return (user && (
    <div className={styles.solo_chat_container}>
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
    </div>
  )
  )
};


export default Chat;

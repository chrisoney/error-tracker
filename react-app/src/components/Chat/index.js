import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import { fetchAllMessages, createNewMessage } from '../../store/message';

import styles from './chat.module.css';
let socket;

const Chat = (props) => {
  const id = parseInt(props.id);
  const username = props.username
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState("");
  const oldMessages = useSelector(state => state.messages.messages);
  const [messages, setMessages] = useState([]);
  const user = useSelector(state => state.session.user);
  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
   
    socket.on("chat", (chat) => {
      setMessages(messages => [...messages, chat])
    })
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  useEffect(() => {
    dispatch(fetchAllMessages())
  }, [dispatch])


  useEffect(() => {
    const filteredMessages = oldMessages.filter(msg => {
      return msg.sender_id === id || msg.recipient_id === id
    }).map((msg) => {
      console.log(msg.sender_id, id)
      console.log(msg.sender_username, msg.recipient_username)
      console.log(msg.sender_id === id ?
        msg.sender_username : msg.recipient_username,)
      return {
        user: msg.sender_username,
        msg: msg.body
      }
    })
    console.log(filteredMessages)
    setMessages([...filteredMessages, ...messages])
  }, [oldMessages])


  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  const sendChat = (e) => {
    e.preventDefault()
    dispatch(createNewMessage(chatInput, props.id))
    socket.emit("chat", { user: user.username, msg: chatInput });
    setChatInput("")
  }

  return (user && (
    <div className={styles.chat_container}>
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

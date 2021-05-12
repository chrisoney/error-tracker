open.map((user, idx) => {
  return (
    <div key={`open-chat-${idx}`} className={styles.open_chat_container}>
      <div
        className={styles.open_chat_username}
        onClick={setSelectedUser(user.id)}
      >
        {user.username}
      </div>
      {/* {user.id === selectedUser
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
        : null} */}
    </div>
  )
})
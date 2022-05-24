import React, { useEffect, useState } from "react";
import { useChannel } from "./LiveChatReactEffect";
import styles from "./LiveChat.module.css";

const LiveChat = (props) => {
  let inputBox = null;
  let messageEnd = null;

  const [messageId, setMessageId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel(props.channelName, (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  useEffect(() => {
    console.info({ receivedMessages, bool: !receivedMessages.length })
    if (!receivedMessages.length) {
      channel.history().then((res) => setMessages([...res.items].reverse()));
    }
  }, []);

  const sendChatMessage = (messageText) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
    if (!messageId) setMessageId(message.connectionId);
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    const messageClass = messageId === message.connectionId 
      ? "message1" 
      : "message2";
    console.log(message)
    return (
      <span key={index} className={styles[messageClass]} data-author={author}>
        {message.data}
      </span>
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHolder}>
        <div className={styles.chatText}>
          {messages}
          <div
            ref={(element) => {
              messageEnd = element;
            }}
          ></div>
        </div>
        <form onSubmit={handleFormSubmission} className={styles.form}>
          <textarea
            ref={(element) => {
              inputBox = element;
            }}
            value={messageText}
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.textarea}
          ></textarea>
          <button
            type="submit"
            className={styles.button}
            disabled={messageTextIsEmpty}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;

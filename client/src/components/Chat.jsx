import React, { useEffect, useState } from "react";
import { useGameContext } from "../context/ContextProvider";
import { socket } from "../context/socketProvider";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageReceive, setMessageReceive] = useState([]);
  const { userName, room } = useGameContext();

  const handleData = async () => {
    const messageData = {
      userName: userName,
      room: room,
      message: message,
      date:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_message", messageData);
    setMessage("");
  };
  const sendMessage = () => {
    if (message) {
      handleData();
    }
  };
  const keypressHandler = (e) => {
    if (e.key === "Enter" && message) {
      handleData();
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceive([...messageReceive, data]);
    });
  }, );
  return (
    <div>
      <input
        style={{ border: "1px solid black" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => keypressHandler(e)}
      />
      <button onClick={() => sendMessage()}>Send Message</button>
      <h1>Message:</h1>
      {messageReceive.map((mess, index) => {
        return <div key={index}>
          <h4 className="font-extrabold text-slate-900">{mess.userName}</h4>
          <h4 >{mess.message}</h4>
        </div>
        
      })}
    </div>
  );
};

export default Chat;

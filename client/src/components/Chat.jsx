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
    // <div className="bg-black"> 
    //   <input
    //     style={{ border: "1px solid black" }}
    //     value={message}
    //     onChange={(e) => setMessage(e.target.value)}
    //     onKeyPress={(e) => keypressHandler(e)}
    //   />
    //   <button onClick={() => sendMessage()}>Send Message</button>
    //   <h1>Message:</h1>
    //   {messageReceive.map((mess, index) => {
    //     return <div key={index}>
    //       <h4 className="font-extrabold text-slate-900">{mess.userName}</h4>
    //       <h4 >{mess.message}</h4>
    //     </div>
        
    //   })}
    // </div>
    <div className="p-4 fixed bottom-0 left-0 w-full max-w-md">
  <div className="flex items-center mb-4">
    <input
      className="border border-white p-2 flex-grow text-black"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => keypressHandler(e)}
      placeholder="Type your message..."
    />
    <button
      className="bg-blue-500 text-black p-2 ml-2 rounded"
      onClick={() => sendMessage()}
    >
      Send Message
    </button>
  </div>
  <h1 className="text-xl font-bold text-white mb-2">Message:</h1>
  <div className="overflow-y-auto max-h-60">
    {messageReceive.map((mess, index) => {
      console.log(mess);
      return (
      <div key={index} className="mb-2">
        <h4 className="font-extrabold text-slate-900">{mess.userName}</h4>
        <p className="text-white break-words">{mess.message}</p>
      </div>
      )
      })}
  </div>
</div>

  );
};

export default Chat;

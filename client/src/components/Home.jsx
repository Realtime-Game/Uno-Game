import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGameContext } from "../context/ContextProvider";
import { socket } from "../context/socketProvider";

function Home() {
  const { userName, setUserName, room, setRoom, users, setUsers } =
    useGameContext();
  const joinRoom = () => {
    if (userName && room) {
      socket.emit("join-room", { room, userName });
    }
  };

  useEffect(() => {
    socket.on("users-login", (data) => {
      setUsers(data);
    });
  }, [socket]);
  return (
    <>
      <div className="flex flex-row">
        <div className="w-[55%] h-[100vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1617783919141-8417358d4e29?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center w-[45%] bg-[#DCF2F1] font-mono shadow-xl">
          <div className="flex flex-col justify-center items-center w-[350px] h-[350px] bg-[#faf9f8] shadow-lg rounded-xl gap-2">
            <label htmlFor="">Name: </label>
            <input
              placeholder="John..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="rounded-md shadow-md"
            />
            <label htmlFor="">Room: </label>
            <input
              placeholder="123..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              className="rounded-md shadow-md"
            />
            <Link
              to={userName && room ? "/uno" : "/"}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-600"
            >
              <button onClick={joinRoom}>Join game</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

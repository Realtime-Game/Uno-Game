import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGameContext } from "../context/ContextProvider";
import { socket } from "../context/socketProvider";
function Home() {
  const { userName, setUserName, room, setRoom, setUsers } =
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
      <div className="bg-gif bg-cover">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="flex flex-col justify-center items-center w-[350px] h-[300px] bg-gradient-to-r from-red-400 to-blue-500 hover:from-red-500 hover:to-yellow-500 shadow-xl rounded-xl gap-2 font-mono">
            <label htmlFor="" className="text-slate-950 italic font-extrabold">Name </label>
            <input
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="rounded-md shadow-md pl-[8px]"
            />
            <label htmlFor="" className="text-slate-950 italic font-extrabold">Room </label>
            <input
              placeholder="Room"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              className="rounded-md shadow-md pl-[8px]"
            />
            <Link
              to={userName && room ? "/uno" : "/"}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-600"
            >
              <button className="text-slate-950 italic font-extrabold" onClick={joinRoom}>Join game</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import { useGameContext } from "../context/ContextProvider";
import Hand from "./Hand";
import Chat from "./Chat";
import Table from "./Table";
import { socket } from "../context/socketProvider";
import landingPageImage from "../assets/bgR.png";

// ...

<div className="relative flex items-center justify-center">
  <img
    src={landingPageImage}
    alt="Background GIF"
    className="w-screen h-screen object-cover"
  />
  {/* ... */}
</div>;

const Board = () => {
  const [user, setUser] = useState();
  const [userCards, setUserCards] = useState([]);
  const { totalCards, setTotalCards, users } = useGameContext();

  const handleUserCards = () => {
    setUserCards(totalCards && totalCards.slice(0, 6));
    setTotalCards(totalCards.splice(6));
    socket.emit("distribute-card", totalCards.slice(0, 6));
  };

  useEffect(() => {
    socket.on("users-login", (data) => {
      setUser(data[0]);
    });
  }, [users]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-green-800 text-white">
      <div className="relative flex items-center justify-center">
        <img
          src={landingPageImage}
          alt="Background GIF"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          {}
          <h1 className="text-4xl font-bold mb-6 text-yellow-300">
            Welcome on Board {user && user.userName}
          </h1>
          <button
            className="btn btn-primary text-2xl bg-red-400 rounded-md mb-6"
            onClick={handleUserCards}
          >
            Distribute Cards
          </button>
          <Table />
        </div>
      </div>
      <Chat />
      <div className="flex flex-col items-center space-y-4 mb-6">
        {users.length > 0 &&
          users.map((user) => (
            <h3 key={user.userName} className="text-lg font-semibold">
              {user.userName}
            </h3>
          ))}
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
        <Hand userCards={userCards} setUserCards={setUserCards} />
      </div>
    </div>
  );
};

export default Board;

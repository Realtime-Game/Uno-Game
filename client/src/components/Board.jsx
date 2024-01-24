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
    <div className="w-screen h-screen relative bg-white">
      <h1 className="text-3xl font-bold bg-green-600">Welcome on Board {user&&user.userName}</h1>
      <button
        className="btn btn-primary text-2xl bg-red-400 rounded-md"
        onClick={() => handleUserCards()}
      >
        Distribute Cards
      </button>
      <Chat />
      <div>{users.length&&users.map(user => {
        return (
          <h3>{user.userName}</h3>
        )
      })}</div>
      <Table />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 ">
        <Hand userCards={userCards} setUserCards={setUserCards} />
      </div>
    </div>
  );
};

export default Board;

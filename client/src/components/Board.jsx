import React, { useState, useEffect } from "react";
import { useGameContext } from "../context/ContextProvider";
import Hand from "./Hand";
import Chat from "./Chat";
import Table from "./Table";
import { socket } from "../context/socketProvider";
import landingPageImage from "../assets/bgR.png";

<div className="relative flex items-center justify-center">
  <img
    src={landingPageImage}
    alt="Background GIF"
    className="w-screen h-screen object-cover"
  />
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
    <>
      <div className="w-screen h-screen bg-main-board bg-cover bg-center">
        <div className="relative flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-yellow-300">
              Welcome on Board {user && user.userName}
            </h1>
            <p className="text-gray-50 italic">
              Players:{" "}
              {users?.map(
                (user, idx) => (idx !== 0 ? ", " : "") + user.userName
              )}
            </p>
            {users.length &&
              users.map((user) => (
                <h3 key={user.userName} className="text-gray-50">
                  {user.userName}
                </h3>
              ))}
            <button
              className="btn btn-error  bg-gradient-to-r hover:from-red-500 hover:to-yellow-500 italic"
              onClick={handleUserCards}
            >
              Distribute Cards
            </button>

            <Table/>
          </div>
        </div>
        <Chat />
        <div className="fixed bottom-0 right-0 p-4">
        <Hand userCards={userCards} setUserCards={setUserCards} />
      </div>
      </div>
    </>
  );
};

export default Board;

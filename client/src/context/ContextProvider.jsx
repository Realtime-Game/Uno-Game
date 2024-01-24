import React, { createContext, useContext, useState, useEffect } from "react";
import { cards } from "../utils/cards";
import { shuffleCards } from "../utils/handleCards";

const GameContext = createContext();

export const ContextProvider = ({ children }) => {
  const [totalCards, setTotalCards] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  console.log(totalCards, "tt", tableCards);
  const handleCards = () => {
    setTotalCards(shuffleCards(cards));
  };
  useEffect(() => {
    handleCards();
  }, []);
  return (
    <GameContext.Provider
      value={{
        totalCards,
        setTotalCards,
        userName,
        setUserName,
        room,
        setRoom,
        tableCards,
        setTableCards,
        users,
        setUsers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export const useGameContext = () => useContext(GameContext);

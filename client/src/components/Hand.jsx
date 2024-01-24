import React, { useState, useEffect } from "react";
import { useGameContext } from "../context/ContextProvider";
import { socket } from "../context/socketProvider";
import { playCard, showCard } from "../utils/play";
const Hand = ({ userCards, setUserCards }) => {
  const [playable, setPlayable] = useState();
  const [draw, setDraw] = useState(true);
  const [turn, setTurn] = useState();
  const { userName, room, tableCards, totalCards, setTotalCards } =
    useGameContext();

  const handleUserCards = async (card, i) => {
    const cardData = {
      userName: userName,
      room: room,
      card: card,
      playable: playable,
    };
    console.log(cardData);

    if (showCard(tableCards, card)) {
      setUserCards(userCards.filter((item, index) => index !== i));
      socket.emit("place-down", cardData);
    }
  };

  const handleDrawCard = (number) => {
    setUserCards([...totalCards.slice(0, 1), ...userCards]);
    setTotalCards(totalCards.splice(number));
    setDraw(false);
  };

  useEffect(() => {
    if (!playCard(tableCards, userCards) && draw) {
      handleDrawCard(1);
    } else {
      setPlayable(playCard(tableCards, userCards));
    }
  }, [tableCards, userCards]);
  return (
    <div className="flex flex-wrap">
      {userCards &&
        userCards.map((card, i) => {
          return (
            <div
              key={card.id}
              onClick={() => {
                handleUserCards(card, i);
              }}
            >
              <img
                className="transition w-30 h-40 hover:scale-110 cursor-pointer"
                src={"../src/assets/" + card.url}
                alt={card.url}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Hand;

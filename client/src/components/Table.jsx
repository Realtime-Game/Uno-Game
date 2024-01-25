import React, { useState, useEffect } from "react";
import { socket } from "../context/socketProvider";
import { useGameContext } from "../context/ContextProvider";
function Table({className}) {
  const [cardFace, setCardFace] = useState();
  const {tableCards,setTableCards} = useGameContext()
  useEffect(() => {
    socket.on("show-card", (data) => {
        console.log(data);
      setCardFace(data);
      setTableCards([data,...tableCards])
    });
  }, [socket]);
  return (
    <>
      {cardFace ? (
          <div className={`flex flex-col items-center ${className}`}>
          <h3>{cardFace && cardFace.userName}</h3>
          <img
            className="transition w-40 h-50  cursor-pointer"
            src={"../src/assets/" + cardFace.card.url}
            alt={cardFace.card.url}
            />
        </div>
      ) : (
          <div>
        </div>
      )}
    </>
  );
}

export default Table;

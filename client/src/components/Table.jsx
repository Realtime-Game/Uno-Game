import React, { useState, useEffect } from "react";
import { socket } from "../context/socketProvider";
import { useGameContext } from "../context/ContextProvider";
function Table() {
  const [cardFace, setCardFace] = useState(null);
  const {tableCards,setTableCards} = useGameContext()
  useEffect(() => {
    socket.on("show-card", (data) => {
        console.log(data);
      setCardFace(data);
      setTableCards([data,...tableCards])
    });
  }, [socket]);
  console.log(cardFace);
  return (
    <>
    <div className="bg-white">

      {cardFace ? (
          <div>
          <h3>{cardFace && cardFace.userName}</h3>
          <img
            className="transition w-40 h-50  cursor-pointer"
            src={"./assets/" + cardFace.card.url}
            alt={cardFace.card.url}
            />
        </div>
      ) : (
          <div>
          <h3>Waiting for user</h3>
        </div>
      )}
      </div>
    </>
  );
}

export default Table;

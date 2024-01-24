export function playCard(tableCards, userCards) {
    if (!tableCards.length) return true;
  
    if (tableCards.length && userCards.length) {
      const color1 = tableCards[0].card.color;
      const value1 = tableCards[0].card.value;
  
      switch (value1) {
        case "Skip":
          return false;
        case "Reverse":
          return false;
        case "Draw":
          return userCards.some((item) => {
            return item.value === "Draw" || item.value === "Draw4";
          });
        case "Draw4":
          return userCards.some((item) => {
            return item.value === "Draw4";
          });
        default:
          return userCards.some(
            (item) =>
              item.color == color1 ||
              item.value === value1 ||
              item.value === "Wild" ||
              item.value === "Draw"
          );
      }
    }
  }
  
  export function showCard(tableCards, card) {
    if (!tableCards.length) return true;

    const color = tableCards[0].color;
    const value = tableCards[0].value;
  
    switch (value) {
      case "Skip":
        return false;
      case "Reverse":
        return false;
      case "Draw":
        return card.value === value || card.value === "Draw4";
      case "Draw4":
        return card.value === value;
      default:
        return (
          card.value === value ||
          card.color === color ||
          card.value === "Wild" ||
          card.value === "Draw4"
        );
    }
  }
  
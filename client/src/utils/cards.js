export const deck = [
    "Blue_0.png",
    "Blue_1.png",
    "Blue_2.png",
    "Blue_3.png",
    "Blue_4.png",
    "Blue_5.png",
    "Blue_6.png",
    "Blue_7.png",
    "Blue_8.png",
    "Blue_9.png",
    "Blue_Draw.png",
    "Blue_Reverse.png",
    "Blue_Skip.png",
    "Blue_0.png",
    "Blue_1.png",
    "Blue_2.png",
    "Blue_3.png",
    "Blue_4.png",
    "Blue_5.png",
    "Blue_6.png",
    "Blue_7.png",
    "Blue_8.png",
    "Blue_9.png",
    "Blue_Draw.png",
    "Blue_Reverse.png",
    "Blue_Skip.png",
    "Green_0.png",
    "Green_1.png",
    "Green_2.png",
    "Green_3.png",
    "Green_4.png",
    "Green_5.png",
    "Green_6.png",
    "Green_7.png",
    "Green_8.png",
    "Green_9.png",
    "Green_Draw.png",
    "Green_Reverse.png",
    "Green_Skip.png",
    "Green_0.png",
    "Green_1.png",
    "Green_2.png",
    "Green_3.png",
    "Green_4.png",
    "Green_5.png",
    "Green_6.png",
    "Green_7.png",
    "Green_8.png",
    "Green_9.png",
    "Green_Draw.png",
    "Green_Reverse.png",
    "Green_Skip.png",
    "Red_0.png",
    "Red_1.png",
    "Red_2.png",
    "Red_3.png",
    "Red_4.png",
    "Red_5.png",
    "Red_6.png",
    "Red_7.png",
    "Red_8.png",
    "Red_9.png",
    "Red_Draw.png",
    "Red_Reverse.png",
    "Red_Skip.png",
    "Red_0.png",
    "Red_1.png",
    "Red_2.png",
    "Red_3.png",
    "Red_4.png",
    "Red_5.png",
    "Red_6.png",
    "Red_7.png",
    "Red_8.png",
    "Red_9.png",
    "Red_Draw.png",
    "Red_Reverse.png",
    "Red_Skip.png",
    "Yellow_0.png",
    "Yellow_1.png",
    "Yellow_2.png",
    "Yellow_3.png",
    "Yellow_4.png",
    "Yellow_5.png",
    "Yellow_6.png",
    "Yellow_7.png",
    "Yellow_8.png",
    "Yellow_9.png",
    "Yellow_Draw.png",
    "Yellow_Reverse.png",
    "Yellow_Skip.png",
    "Yellow_0.png",
    "Yellow_1.png",
    "Yellow_2.png",
    "Yellow_3.png",
    "Yellow_4.png",
    "Yellow_5.png",
    "Yellow_6.png",
    "Yellow_7.png",
    "Yellow_8.png",
    "Yellow_9.png",
    "Yellow_Draw.png",
    "Yellow_Reverse.png",
    "Yellow_Skip.png",
    "Wild_Wild.png",
    "Wild_Wild.png",
    "Wild_Wild.png",
    "Wild_Wild.png",
    "Wild_Draw4.png",
    "Wild_Draw4.png",
    "Wild_Draw4.png",
    "Wild_Draw4.png",
  ];
  
  export const cards = deck.map((item, index) => {
    const underScore = item.indexOf("_");
    const dot = item.indexOf(".");
    const color = item.slice(0, underScore);
    const value = item.slice(underScore + 1, dot);
    const card = {
      color: color,
      value: value,
      id: index,
      url: item,
    };
    return card;
  });
  
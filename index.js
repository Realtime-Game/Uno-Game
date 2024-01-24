const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const { createAndShuffleDeck, drawCardsFromDeck, canPlaceCard, removeCardFromHand } = require("./client/src/utils/cards.js")

app.use(cors());

let users = [];

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  //join room
  socket.on("join-room", (data) => {
    socket.join(data.room);
    // console.log(`user with id ${socket.id} joined room ${data.room}`);
    users.unshift(data);
    // console.log(users);
    io.to(data.room).emit(
      "users-login",
      users.filter((user) => user.room === data.room)
    );
  });

  //messages
  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  //play cards
  socket.on("distribute-card", (data) => {
    const playerDeck = drawCardsFromDeck(createAndShuffleDeck(), 7);
    socket.emit("receive-cards", { cards: playerDeck, room: data.room });
  });

  socket.on("place-down", (data) => {
    const { room, playerId, card } = data;
    const player = users.find(user => user.id === playerId);

    // Validasi apakah pemain dapat meletakkan kartu tersebut
    if (canPlaceCard(card, player.deck)) {
      // Hapus kartu dari tangan pemain
      removeCardFromHand(player.deck, card);

      // Broadcast kartu yang diletakkan ke semua pemain di room
      io.to(room).emit("show-card", { playerId, card });

      changeTurn();
    } else {
      // Kirim pesan bahwa pemain tidak dapat meletakkan kartu tersebut
      socket.emit("invalid-move", "You cannot place this card.");
    }
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
});

server.listen(5252, () => {
  console.log("listening on port 5252");
});

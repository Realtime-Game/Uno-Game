const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
let users = [];
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello");
});

io.on("connection", (socket) => {
  //join room
  socket.on("join-room", (data) => {
    socket.join(data.room);
    console.log(`user with id ${socket.id} joined room ${data.room}`);
    users.unshift(data);
    console.log(users);
    io.to(data.room).emit("users-login",users.filter(user=>user.room === data.room))
  });

  //messages
  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  //play cards
  socket.on("distribute-card", (data) => {
    console.log("cards", data);
  });
  
  socket.on("place-down", (data) => {
    console.log(data);
    io.to(data.room).emit("show-card", data);
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});

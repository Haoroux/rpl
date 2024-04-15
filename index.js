const PORT = process.env.PORT || 3000;

const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

var allPixels = {};

io.on("connect", (socket) => {
  console.log(`New Client: ${socket.id}`);
  socket.emit("pixelModified", allPixels);
  socket.on("modifPixel", function ({spanId, color}) {
    allPixels[spanId] = color;
    console.log(`New Message Received: ${spanId} - ${color}`);
    io.sockets.emit("pixelModified", allPixels);
  });
});

server.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
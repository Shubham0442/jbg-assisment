const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();
const cors = require("cors");
const { messageConroller } = require("./Controller/messge.controller");
const PORT = process.env.PORT || 5051;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    optionsSuccessStatus: 204,
    credentials: true
  }
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("chat message", (message) => {
    io.emit("chat message", message);
    console.log(message);

    if (message === "Hello") socket.emit("chat message", "Hi")
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/message", messageConroller);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

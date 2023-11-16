const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);


app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`Client has connected-${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client has disconnected");
  });
});

server.listen(PORT, () => {
  console.log("server is up and running");
});
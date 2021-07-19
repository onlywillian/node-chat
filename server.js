const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {//Quando alguém se conectar
  console.log('a user connected');

  socket.on('chat message', msg => {//Quando enviar uma msg
    io.emit('message', msg)//Emitindo de volta
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
import express from 'express';
import path from 'path';
import { Server } from 'socket.io'
import { createServer } from 'http';

import { 
  ServerToClientEvents, 
  ClientToServerEvents, 
  InterServerEvents, 
  SocketData } 
from './src/io';

const app = express();
const server = createServer(app);

const io = new Server<
  ServerToClientEvents, 
  ClientToServerEvents, 
  InterServerEvents, 
  SocketData
>(server);

app.use(express.static(path.join(process.cwd(), 'public')));//Servindo os arquivos

/* Quando o usuário se conectar */
io.on('connection', socket => {
  socket.broadcast.emit("newUser", io.engine.clientsCount);
  socket.emit("newUser", io.engine.clientsCount);

  socket.on("typing", user => {
    socket.broadcast.emit("typing", user);
  });

  /* emmiting for all users except the sender */
  socket.on("chatMessage", (msg, user) => {
    socket.broadcast.emit("messageForAllUsers", msg);
  });

  socket.on('disconnecting', () => socket.broadcast.emit("newUser", io.engine.clientsCount));
});

server.listen(process.env.PORT || 3000, () => console.log('listening on port 3000'));//Caso seja acessado pelo Heroku
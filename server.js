const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));//Servindo os arquivos

/* Quando o usuário se conectar */
io.on('connection', socket => {
  /*
  * Por algum motivo o socket só está emitindo para o sender
  * Então por isso é necessário o uso dos dois emissores
  */
  socket.broadcast.emit("new user", io.engine.clientsCount);
  socket.emit("new user", io.engine.clientsCount);

  socket.on("typing", user => {
    socket.broadcast.emit("typing", user);
  });

  socket.on('')

  /* emmiting for all users except the sender */
  socket.on("chat message", (msg, user) => {
    socket.broadcast.emit("message for all users", msg);
  });

  socket.on('disconnecting', () => socket.broadcast.emit("new user", io.engine.clientsCount));
});

httpServer.listen(process.env.PORT || 3000);//Caso seja acessado pelo Heroku
const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));//Servindo os arquivos

io.on('connection', function (socket) {
  socket.emit("new user", "A new user has connected!");

  socket.on("chat message", msg => {
    socket.broadcast.emit("message for all users", msg);
  });
});

httpServer.listen(process.env.PORT || 3000);//Caso seja acessado pelo Heroku
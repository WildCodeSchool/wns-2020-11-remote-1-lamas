const express = require('express');
const http = require('http');

const app = express();
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

const {
  addUser,
  getIncrement,
  removeUser,
  getUserCount,
} = require('./user.js');

const PORT = process.env.PORT || 8000;

app.use(cors());

io.on('connect', (socket) => {
  socket.on('join', () => {
    addUser(socket.id);
    const userCount = getUserCount();
    socket.broadcast.emit('sendUserCount', userCount);
  });

  socket.on('changeMood', (name, category) => {
    const emojisIncremented = getIncrement(name, socket.id, category);
    socket.broadcast.emit('getIncrement', emojisIncremented);
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    const userCount = getUserCount();
    socket.broadcast.emit('sendUserCount', userCount);
  });
});

// Heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
  });
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import { createServer } from 'http';

import { join } from 'path';
import cors from 'cors';
// import socketio from 'socket.io';
import socketIO, { Socket } from 'socket.io';

// import * as http from 'http';
// import * as socket from 'socket.io';
const app = express();
const server = createServer(app);
const io: socketIO.Server = socketIO(server);

import {
  addUser,
  IncrementEmojis,
  removeUser,
  getUserCount,
  getMoodCounter,
} from './user.js';

const PORT = process.env.PORT || 8000;

app.use(cors());

io.on('connect', (socket: Socket) => {
  socket.on('join', () => {
    addUser(socket.id);
    const userCount = getUserCount();
    socket.broadcast.emit('sendUserCount', userCount);
  });

  socket.on('joinTeacher', () => {
    const emojisIncremented = getMoodCounter();
    socket.emit('getIncrement', emojisIncremented);
  });

  socket.on('changeMood', (name, category) => {
    IncrementEmojis(name, socket.id, category);
    const emojisIncremented = getMoodCounter();
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
  app.use(express.static(join(__dirname, './frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, './frontend/build/index.html'));
  });
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

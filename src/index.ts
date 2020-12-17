import express from 'express';
import { join } from 'path';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import http from 'http';

const app = express();
const httpServer = new http.Server(app);

const io = new Server(httpServer);

import {
  addUser,
  IncrementEmojis,
  removeUser,
  getUserCount,
  getMoodCounter,
} from './user';

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

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

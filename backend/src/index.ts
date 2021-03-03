import express from 'express';
import { join } from 'path';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import http from 'http';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongodbStart from './database/db';

import serverApollo from './graphql/graphqlServer';
import {
  addUser,
  IncrementEmojis,
  removeUser,
  getUserCount,
  getMoodCounter,
} from './user';
import NotFoundError from './errors/NotFoundError';

dotenv.config();

// initialize express server with apollo and cors
mongodbStart();

const app = express();
app.use(cors());

serverApollo.applyMiddleware({
  app,
  cors: false,
});
const httpServer = new http.Server(app);
const io = new Server(httpServer);

app.use(cookieParser());

app.get('*', () => {
  const error = new NotFoundError();
  throw error;
});

// socket io logic TO BE MODIFIED

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
    const emojisDecremented = getMoodCounter();
    socket.broadcast.emit('sendUserCount', userCount);
    socket.broadcast.emit('getDecrement', emojisDecremented);
  });
});

// Heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, './frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, './frontend/build/index.html'));
  });
}

/* eslint-disable no-console */
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () =>
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`)
);

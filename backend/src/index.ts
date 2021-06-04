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
  updateEmojisCount,
  removeUser,
  getUserCount,
  getMoodCounter,
  getUserInfos,
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

const users: Record<string, string> = {};

// socket io logic TO BE MODIFIED
io.on('connect', (socket: Socket) => {
  console.log('test socket connection', socket.id);
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  socket.emit('yourId', socket.id);
  io.sockets.emit('allUsers', users);
  socket.on('callUser', (data) => {
    console.log('data call user', data);
    io.to(data.userToCall).emit('userCallingMe', {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on('acceptCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  socket.on('join', async (roomId, userId, firstname, lastname) => {
    addUser(roomId, userId, firstname, lastname, socket.id);
    const userCount = await getUserCount(roomId);
    socket.broadcast.emit('sendUserCount', userCount);
  });

  socket.on('joinTeacher', async (roomId, userId) => {
    const userCount = await getUserCount(roomId);
    socket.broadcast.emit('sendUserCount', userCount);
    const emojisCount = await getMoodCounter(roomId);
    socket.emit('updateEmojisCount', emojisCount);
  });

  socket.on('changeMood', async (roomId, userId, name, category) => {
    await updateEmojisCount(roomId, name, userId, category);
    const emojisCount = await getMoodCounter(roomId);
    socket.broadcast.emit('updateEmojisCount', emojisCount);
    const user = await getUserInfos(roomId, userId);
    socket.emit('userInfos', user);
  });

  socket.on('disconnect', async () => {
    delete users[socket.id];
    // Gérer la RAZ de la DB en vérifiant si c'est le teacher (user.role cf model)
    const roomId = await removeUser(socket.id);
    const userCount = await getUserCount(roomId);
    const emojisDecremented = await getMoodCounter(roomId);
    socket.broadcast.emit('sendUserCount', userCount);
    socket.broadcast.emit('getDecrement', emojisDecremented);
  });
});

// Heroku deployment
/* if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, './frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, './frontend/build/index.html'));
  });
}
*/

/* eslint-disable no-console */
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () =>
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`)
);

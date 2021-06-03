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

// socket io logic TO BE MODIFIED

io.on('connect', (socket: Socket) => {
  socket.emit('yourID', socket.id);
  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('userCallingMe', {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on('acceptCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  socket.on('join', () => {
    addUser(socket.id);
    const userCount = getUserCount();
    socket.broadcast.emit('sendUserCount', userCount);
    // TEST VIDEO
    socket.broadcast.emit('sendId', socket.id);
  });

  socket.on('joinTeacher', async () => {
    const userCount = getUserCount();
    socket.broadcast.emit('sendUserCount', userCount);
    const emojisCount = await getMoodCounter();
    socket.emit('updateEmojisCount', emojisCount);
  });

  socket.on('changeMood', async (name, category) => {
    await updateEmojisCount(name, socket.id, category);
    const emojisCount = await getMoodCounter();
    socket.broadcast.emit('updateEmojisCount', emojisCount);
    const user = getUserInfos(socket.id);
    socket.emit('userInfos', user);
  });

  socket.on('disconnect', async () => {
    // Gérer la RAZ de la DB en vérifiant si c'est le teacher (user.role cf model)
    await removeUser(socket.id);
    const userCount = getUserCount();
    const emojisDecremented = await getMoodCounter();
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

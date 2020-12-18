import express from 'express';
import { join } from 'path';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import http from 'http';
import start from './database/db';
import * as dotenv from "dotenv";
import {ApolloServer} from 'apollo-server-express'
import {makeExecutableSchema} from 'apollo-server'
import {OrganizationType} from "./graphql/typeDef"
import {organizationResolver} from './graphql/resolvers'

import {
  addUser,
  IncrementEmojis,
  removeUser,
  getUserCount,
  getMoodCounter,
} from './user';


const schema = makeExecutableSchema({
  typeDefs:[OrganizationType],
  resolvers:[organizationResolver],
});



dotenv.config();

start();

const app = express();
const server = new ApolloServer({
  schema: schema
});
server.applyMiddleware({ app });
const httpServer = new http.Server(app);

const io = new Server(httpServer);


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



httpServer.listen(PORT, () => console.log(`Apollo Server on http://localhost:${PORT}/graphql`));

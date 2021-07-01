import express from 'express';
import cors from 'cors';
import http from 'http';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongodbStart from './database/db';
import serverApollo from './graphql/graphqlServer';
import NotFoundError from './errors/NotFoundError';
import { SocketIo } from './socket';

dotenv.config();

mongodbStart();

const app = express();
app.use(cors());

serverApollo.applyMiddleware({
  app,
  cors: false,
});
const httpServer = new http.Server(app);

app.use(cookieParser());

app.get('*', () => {
  const error = new NotFoundError();
  throw error;
});

SocketIo(httpServer);

/* eslint-disable no-console */
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () =>
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`)
);

import { io, Socket } from 'socket.io-client';

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_LAMAS_BACK}`
    : `${process.env.REACT_APP_LOCALHOST}`;

const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
});

export default socket;

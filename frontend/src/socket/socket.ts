import { io, Socket } from 'socket.io-client';

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://lamaswild.herokuapp.com/'
    : 'localhost:8000';

const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
});

export default socket;
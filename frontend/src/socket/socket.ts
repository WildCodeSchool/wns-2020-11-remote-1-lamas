import { io, Socket } from 'socket.io-client';

const connectedUser = localStorage.getItem('user');

const ENDPOINT = `${process.env.REACT_APP_LAMAS_BACK}`;
const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
  query: connectedUser ? { connectedUser } : {},
});

export default socket;

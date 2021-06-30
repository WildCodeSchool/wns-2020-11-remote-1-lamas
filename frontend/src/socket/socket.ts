import { io, Socket } from 'socket.io-client';
import { currentUser } from '../cache';

const connectedUser = currentUser();
console.log(connectedUser);

const ENDPOINT = `${process.env.REACT_APP_LAMAS_BACK}`;
const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
  query: { connectedUser },
});

export default socket;

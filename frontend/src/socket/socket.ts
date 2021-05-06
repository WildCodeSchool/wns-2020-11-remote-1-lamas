import { io, Socket } from 'socket.io-client';

const ENDPOINT = `${process.env.REACT_APP_LAMAS_BACK}`;
const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
});

export default socket;

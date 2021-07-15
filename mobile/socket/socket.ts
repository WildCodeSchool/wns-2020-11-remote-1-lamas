import { io, Socket } from 'socket.io-client';
import { REACT_APP_LAMAS_BACK } from '@env';

const ENDPOINT = `${REACT_APP_LAMAS_BACK}`;

const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
});
export default socket;

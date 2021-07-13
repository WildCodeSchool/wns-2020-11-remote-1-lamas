import { io, Socket } from 'socket.io-client';

export interface ISocket {
  _id: string;
  firstname: string;
  lastname: string;
  roomId: string;
}
const ENDPOINT = `${process.env.REACT_APP_LAMAS_BACK}`;

const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
});
export default socket;

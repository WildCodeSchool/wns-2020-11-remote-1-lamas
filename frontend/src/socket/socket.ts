import { io, Socket } from 'socket.io-client';

// const connectedUser = localStorage.getItem('user');
// console.log('userLocalstorage', connectedUser);

const ENDPOINT = `${process.env.REACT_APP_LAMAS_BACK}`;
// const socket: Socket = io(ENDPOINT, {
//   transports: ['websocket'],
//   query: connectedUser ? { connectedUser } : {},
// });

const socket = (connectedUser: any): Socket => {
  console.log(connectedUser);
  const socketIo: Socket = io(ENDPOINT, {
    transports: ['websocket'],
    query: connectedUser ? { connectedUser } : {},
  });
  return socketIo;
};

export default socket;

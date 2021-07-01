import {
  addUser,
  updateEmojisCount,
  removeUser,
  getUserCount,
  getMoodCounter,
  getUserInfos,
  getUsersInfosEmojis,
  getRoomMessages,
  createRoomMessage,
  deleteMessages,
} from './user';
import { Socket, Server } from 'socket.io';
import http from 'http';

const SocketIo = (httpServer: http.Server) => {
  const io = new Server(httpServer);
  const users: Record<string, string> = {};
  const usersInTheRoom: Record<string, string[]> = {};
  const socketToRoom: Record<string, string> = {};

  io.on('connect', (socket: Socket) => {
    const currentUser = socket.handshake.query as any;
    const connectedUser = JSON.parse(currentUser.connectedUser);

    if (!!connectedUser && !!connectedUser?.roomId) {
      addUser(
        connectedUser.roomId,
        connectedUser._id,
        connectedUser.firstname,
        connectedUser.lastname,
        socket
      );
    }

    socket.on('studentJoinTheRoom', async (roomId) => {
      const userCount = await getUserCount(roomId);
      socket.broadcast.emit('sendUserCount', userCount);
    });

    socket.on('teacherJoinTheRoom', async (roomId) => {
      const userCount = await getUserCount(roomId);
      socket.broadcast.emit('sendUserCount', userCount);
      const emojisCount = await getMoodCounter(roomId);
      socket.emit('updateEmojisCount', emojisCount);
    });

    socket.on('getListUsersPerEmoji', async (roomId, emoji) => {
      const userList = await getUsersInfosEmojis(emoji, roomId);
      socket.emit('userListPerEmoji', userList);
    });

    socket.on('changeMood', async (roomId, userId, name, category) => {
      await updateEmojisCount(roomId, name, userId, category);
      const emojisCount = await getMoodCounter(roomId);
      socket.broadcast.emit('updateEmojisCount', emojisCount);
      const user = await getUserInfos(roomId, userId);
      socket.emit('userInfos', user);
    });

    socket.on('createMessage', async (roomId, userId, message) => {
      await createRoomMessage(socket.id, roomId, userId, message);
      const messages = await getRoomMessages(roomId);
      io.in(roomId).emit('getMessagesList', messages);
    });

    socket.on('getMessages', async (roomId) => {
      const messages = await getRoomMessages(roomId);
      socket.emit('getMessagesList', messages);
    });

    if (!users[socket.id]) {
      users[socket.id] = socket.id;
    }

    socket.on('join room', (roomID: string) => {
      if (usersInTheRoom[roomID]) {
        usersInTheRoom[roomID].push(socket.id);
      } else {
        usersInTheRoom[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersTotalInRoom = usersInTheRoom[roomID].filter(
        (id) => id !== socket.id
      );
      socket.emit('all users', usersTotalInRoom);
    });

    socket.on('sending signal', (payload) => {
      io.to(payload.userToSignal).emit('user joined', {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on('returning signal', (payload) => {
      io.to(payload.callerID).emit('receiving returned signal', {
        signal: payload.signal,
        id: socket.id,
      });
    });

    socket.on('turnOffVideo', () => {
      socket.broadcast.emit('removeUserVideo', socket.id);
    });

    socket.on('disconnect', async () => {
      delete users[socket.id];
      const roomId = await removeUser(socket.id);
      const userCount = await getUserCount(roomId);
      const emojisDecremented = await getMoodCounter(roomId);
      await deleteMessages(roomId, socket.id);
      socket.broadcast.emit('sendUserCount', userCount);
      socket.broadcast.emit('getDecrement', emojisDecremented);
      const roomID = socketToRoom[socket.id];
      let room = usersInTheRoom[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        usersInTheRoom[roomID] = room;
        socket.broadcast.emit('removeUserVideo', socket.id);
      }
    });
  });
};

export { SocketIo };
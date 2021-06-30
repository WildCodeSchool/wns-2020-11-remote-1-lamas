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
} from './user';
import { Socket, Server } from 'socket.io';
import http from 'http';

const SocketIo = (httpServer: http.Server) => {
  const io = new Server(httpServer);
  const users: Record<string, string> = {};

  io.on('connect', (socket: Socket) => {
    console.log(socket);
    console.log('test socket connection', socket.id);
    if (!users[socket.id]) {
      users[socket.id] = socket.id;
    }
    socket.emit('yourId', socket.id);
    io.sockets.emit('allUsers', users);
    socket.on('callUser', (data) => {
      console.log('data call user', data);
      io.to(data.userToCall).emit('userCallingMe', {
        signal: data.signalData,
        from: data.from,
      });
    });

    socket.on('acceptCall', (data) => {
      io.to(data.to).emit('callAccepted', data.signal);
    });

    socket.on(
      'studentJoinTheRoom',
      async (roomId, userId, firstname, lastname) => {
        addUser(roomId, userId, firstname, lastname, socket.id);
        const userCount = await getUserCount(roomId);
        socket.broadcast.emit('sendUserCount', userCount);
      }
    );

    socket.on(
      'teacherJoinTheRoom',
      async (roomId, userId, firstname, lastname) => {
        const userCount = await getUserCount(roomId);
        addUser(roomId, userId, firstname, lastname, socket.id);
        socket.broadcast.emit('sendUserCount', userCount);
        const emojisCount = await getMoodCounter(roomId);
        socket.emit('updateEmojisCount', emojisCount);
      }
    );

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
      socket.emit('getMessagesList', messages);
    });

    socket.on('getMessages', async (roomId) => {
      const messages = await getRoomMessages(roomId);
      socket.emit('getMessagesList', messages);
    });

    socket.on('disconnect', async () => {
      delete users[socket.id];
      const roomId = await removeUser(socket.id);
      const userCount = await getUserCount(roomId);
      const emojisDecremented = await getMoodCounter(roomId);
      socket.broadcast.emit('sendUserCount', userCount);
      socket.broadcast.emit('getDecrement', emojisDecremented);
    });
  });
};

export { SocketIo };

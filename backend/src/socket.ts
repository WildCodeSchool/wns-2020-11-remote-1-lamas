import { Socket, Server } from 'socket.io';
import cookie from 'cookie';
import http from 'http';
import {
  addUser,
  updateEmojisCount,
  removeUserEmoji,
  getUserCount,
  getMoodCounter,
  getUserInfos,
  getUsersInfosEmojis,
  getRoomMessages,
  createRoomMessage,
  deleteMessages,
} from './user';
import { asyncHget } from './database/redis';

const SocketIo = (httpServer: http.Server): void => {
  const io = new Server(httpServer);
  const users: Record<string, string> = {};
  const usersInTheRoom: Record<string, string[]> = {};

  io.on('connect', (socket: Socket) => {
    socket.on('joinTheRoom', async (roomId, _id, firstname, lastname) => {
      addUser(roomId, _id, firstname, lastname, socket);
    });

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
      socket.emit(`userListPerEmoji-${emoji}`, userList);
    });

    socket.on('changeMood', async (roomId, userId, name, category) => {
      await updateEmojisCount(roomId, name, userId, category);
      const emojisCount = await getMoodCounter(roomId);
      socket.broadcast.emit('updateEmojisCount', emojisCount);
      const user = await getUserInfos(roomId, userId);
      socket.emit('userInfos', user);
    });

    socket.on('createMessage', async (roomId, userId, message) => {
      const cookies = cookie.parse(socket.request.headers.cookie || '');
      const userCookie = JSON.parse(cookies.user);
      await createRoomMessage(socket.id, roomId, userId, message, userCookie);
      const messages = await getRoomMessages(roomId);
      io.in(roomId).emit('getMessagesList', messages);
    });

    socket.on('getMessages', async (roomId) => {
      socket.join(roomId);
      const messages = await getRoomMessages(roomId);
      io.in(roomId).emit('getMessagesList', messages);
    });

    if (!users[socket.id]) {
      users[socket.id] = socket.id;
    }

    socket.on('join room', async (roomId: string) => {
      if (usersInTheRoom[roomId]) {
        usersInTheRoom[roomId].push(socket.id);
      } else {
        usersInTheRoom[roomId] = [socket.id];
      }
      const usersTotalInRoom = Array.from(new Set(usersInTheRoom[roomId]));

      const infoUser = [];

      // eslint-disable-next-line no-restricted-syntax
      for await (const userId of usersTotalInRoom) {
        const firstname = await asyncHget(`users-${userId}`, 'firstname');
        const lastname = await asyncHget(`users-${userId}`, 'lastname');

        infoUser.push({ userId, firstname, lastname });
      }

      socket.emit('all users', infoUser);
    });

    socket.on('sending signal', async (payload) => {
      // envoyer lastname, firstname ici
      const firstname = await asyncHget(
        `users-${payload.callerID}`,
        'firstname'
      );
      const lastname = await asyncHget(`users-${payload.callerID}`, 'lastname');

      io.to(payload.userToSignal).emit('user joined', {
        signal: payload.signal,
        callerID: payload.callerID,
        firstname,
        lastname,
      });
    });

    socket.on('returning signal', (payload) => {
      io.to(payload.callerID).emit('receiving returned signal', {
        signal: payload.signal,
        id: socket.id,
      });
    });

    socket.on('switch', (payload) => {
      socket.broadcast.emit('receive change', payload);
    });

    socket.on('remove user', () => {
      socket.broadcast.emit('removeUserVideo', socket.id);
    });

    socket.on('disconnect', async () => {
      delete users[socket.id];
      const roomId = await removeUserEmoji(socket.id);
      const userCount = await getUserCount(roomId);
      const emojisDecremented = await getMoodCounter(roomId);
      await deleteMessages(roomId, socket.id);
      socket.broadcast.emit('sendUserCount', userCount);
      socket.broadcast.emit('getDecrement', emojisDecremented);
      let room = usersInTheRoom[roomId];
      if (room) {
        roomWithoutUserDisconnected = room.filter((id) => id !== socket.id);
        usersInTheRoom[roomId] = roomWithoutUserDisconnected;
        socket.broadcast.emit('removeUserVideo', socket.id);
      }
    });
  });
};

export default SocketIo;

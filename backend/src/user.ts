import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';
import {
  asyncgetLength,
  asyncHmset,
  asyncSadd,
  asyncSrem,
  asyncSisMember,
  asyncSMembers,
  asyncHdel,
  asyncHget,
  asyncSDel,
} from './database/redis';
import { MoodCounter } from './shared/utils';
import Users, { IUser } from './database/models/User';

interface User {
  id: string;
  mood: string;
  actions: string[];
}

interface Message {
  id: string;
  firstname: string;
  lastname: string;
  userId: string;
  message: string;
  date: string;
}

const addUser = (
  roomId: string,
  userId: string,
  firstname: string,
  lastname: string,
  socket: Socket
): void => {
  asyncSadd(`users_list-${roomId}`, userId);
  socket.join(roomId);
  asyncHmset(
    `users-${socket.id}`,
    `lastname`,
    lastname,
    'firstname',
    firstname,
    'roomId',
    roomId,
    'userId',
    userId
  );
};

const getUserCount = async (roomId: string): Promise<number> => {
  const usersLength = await asyncgetLength(`users_list-${roomId}`);
  return usersLength;
};

const deleteMessages = async (
  roomId: string,
  socketId: string
): Promise<void> => {
  setTimeout(async function () {
    const usersLength = await getUserCount(roomId);

    if (usersLength === 0) {
      const messagesRoomId: string[] = await asyncSMembers(
        `${roomId}-messageKeys`
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // eslint-disable-next-line no-restricted-syntax
      for await (const messageId of messagesRoomId) {
        asyncHdel(
          `users-${socketId}`,
          'lastname',
          'firstname',
          'roomId',
          'userId',
          'date',
          'message'
        );
      }

      asyncSDel(`${roomId}-messageKeys`);
    }
  }, 8000);
};

const getUserInfos = async (roomId: string, id: string): Promise<User> => {
  const userIsHappy = await asyncSisMember(`happy-${roomId}`, id);
  const userIsDead = await asyncSisMember(`dead-${roomId}`, id);
  const userIsThinking = await asyncSisMember(`thinking-${roomId}`, id);
  const userWantsCoffee = await asyncSisMember(`coffee-${roomId}`, id);
  const userIsSlowedDown = await asyncSisMember(`slowDown-${roomId}`, id);
  const userAskQuestion = await asyncSisMember(`question-${roomId}`, id);

  const actions: string[] = [];
  let mood = '';

  if (userIsHappy) {
    mood = 'happy';
  } else if (userIsDead) {
    mood = 'dead';
  } else if (userIsThinking) {
    mood = 'thinking';
  }

  if (userWantsCoffee) {
    actions.push('coffee');
  }

  if (userIsSlowedDown) {
    actions.push('slowDown');
  }

  if (userAskQuestion) {
    actions.push('question');
  }

  return {
    id,
    mood,
    actions,
  };
};

const getUsersInfosEmojis = async (
  emoji: string,
  roomId: number
): Promise<IUser[]> => {
  const userListPerEmojis: string[] = await asyncSMembers(`${emoji}-${roomId}`);
  const objectIds = userListPerEmojis.map((id) => Types.ObjectId(id));

  // récupérer que le nom/prénom
  const user: IUser[] = await Users.find(
    { _id: { $in: objectIds } },
    { _id: 1, firstname: 1, lastname: 1 }
  );

  return user;
};

const createRoomMessage = async (
  socketId: string,
  roomId: string,
  userId: string,
  message: string,
  userCookie: any
): Promise<void> => {
  if (roomId && userId && message.length > 0 && !!userCookie) {
    // créer member list messageId avec uuid
    const messageId = uuidv4();
    asyncSadd(`${roomId}-messageKeys`, messageId);
    // créer member rajouter les données du message
    asyncHmset(
      `${roomId}-message-${messageId}`,
      `lastname`,
      userCookie.lastname,
      'firstname',
      userCookie.firstname,
      'roomId',
      roomId,
      'userId',
      userId,
      'message',
      message,
      'date',
      `${new Date()}`
    );
  }
};

const getRoomMessages = async (roomId: number): Promise<Message[]> => {
  // récup les clés
  const messagesRoomId: string[] = await asyncSMembers(`${roomId}-messageKeys`);

  // map et récupérer les données, les push ds un tableau
  const listMessage: Message[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const messageId of messagesRoomId) {
    const firstname = await asyncHget(
      `${roomId}-message-${messageId}`,
      'firstname'
    );
    const lastname = await asyncHget(
      `${roomId}-message-${messageId}`,
      'lastname'
    );
    const userId = await asyncHget(`${roomId}-message-${messageId}`, 'userId');
    const message = await asyncHget(
      `${roomId}-message-${messageId}`,
      'message'
    );
    const date = await asyncHget(`${roomId}-message-${messageId}`, 'date');
    listMessage.push({
      id: messageId,
      firstname,
      lastname,
      userId,
      message,
      date,
    });
  }
  listMessage.sort((a, b) => a.date.localeCompare(b.date));

  return listMessage;
};

const updateEmojisCount = async (
  roomId: string,
  name: string,
  id: string,
  category: string
): Promise<void> => {
  // vérifie si l'utilisateur a une des ces émotions
  const userIsHappy = await asyncSisMember(`happy-${roomId}`, id);
  const userIsDead = await asyncSisMember(`dead-${roomId}`, id);
  const userIsThinking = await asyncSisMember(`thinking-${roomId}`, id);

  const hasEmotion = (userIsHappy || userIsDead || userIsThinking) === 1;

  if (category === 'Emotion') {
    if (hasEmotion) {
      // enlève l'ancienne émotion de cet utilisateur
      if (userIsHappy) {
        asyncSrem(`happy-${roomId}`, id);
      } else if (userIsDead) {
        asyncSrem(`dead-${roomId}`, id);
      } else {
        asyncSrem(`thinking-${roomId}`, id);
      }
    }

    // incremente le nouveau mood emotion
    asyncSadd(`${name}-${roomId}`, id);
  } else if (category === 'Action') {
    // si l'action n'est pas dans le moodCounter

    const userWantsCoffee = await asyncSisMember(`coffee-${roomId}`, id);
    const userIsSlowedDown = await asyncSisMember(`slowDown-${roomId}`, id);
    const userAskQuestion = await asyncSisMember(`question-${roomId}`, id);

    switch (name) {
      case 'coffee':
        if (!userWantsCoffee) {
          asyncSadd(`coffee-${roomId}`, id);
        } else {
          asyncSrem(`coffee-${roomId}`, id);
        }
        break;
      case 'slowDown':
        if (!userIsSlowedDown) {
          asyncSadd(`slowDown-${roomId}`, id);
        } else {
          asyncSrem(`slowDown-${roomId}`, id);
        }
        break;
      case 'question':
        if (!userAskQuestion) {
          asyncSadd(`question-${roomId}`, id);
        } else {
          asyncSrem(`question-${roomId}`, id);
        }
        break;
      default:
    }
  }
};

const getMoodCounter = async (roomId: string): Promise<MoodCounter> => {
  // Commande pour RAZ la database :
  // await asyncFlushDB()
  const questionLength = await asyncgetLength(`question-${roomId}`);
  const coffeeLength = await asyncgetLength(`coffee-${roomId}`);
  const slowDownLength = await asyncgetLength(`slowDown-${roomId}`);
  const thinkingLength = await asyncgetLength(`thinking-${roomId}`);
  const deadLength = await asyncgetLength(`dead-${roomId}`);
  const happyLength = await asyncgetLength(`happy-${roomId}`);

  return {
    happy: happyLength,
    dead: deadLength,
    thinking: thinkingLength,
    coffee: coffeeLength,
    slowDown: slowDownLength,
    question: questionLength,
  };
};

const removeUserEmoji = async (socketId: string): Promise<string> => {
  const userId = await asyncHget(`users-${socketId}`, 'userId');
  const roomId = await asyncHget(`users-${socketId}`, 'roomId');

  if (userId && roomId) {
    // enlève de la liste des emojis
    asyncSrem(`happy-${roomId}`, userId);
    asyncSrem(`dead-${roomId}`, userId);
    asyncSrem(`thinking-${roomId}`, userId);
    asyncSrem(`coffee-${roomId}`, userId);
    asyncSrem(`slowDown-${roomId}`, userId);
    asyncSrem(`question-${roomId}`, userId);
    // enlève de la liste des users de la room
    asyncSrem(`users_list-${roomId}`, userId);
    // supprime les infos de cet user
    asyncHdel(`users-${socketId}`, 'lastname', 'firstname', 'roomId', 'userId');
  }

  return roomId ?? '';
};

export {
  addUser,
  updateEmojisCount,
  removeUserEmoji,
  getUserCount,
  getMoodCounter,
  getUserInfos,
  getUsersInfosEmojis,
  createRoomMessage,
  getRoomMessages,
  deleteMessages,
};

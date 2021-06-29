import {
  asyncgetLength,
  asyncHmset,
  asyncSadd,
  asyncSrem,
  asyncSisMember,
  asyncSMembers,
  asyncHdel,
  asyncHget,
} from './database/redis';
import { MoodCounter } from './shared/utils';
import Users from './database/models/User';
import {Types} from 'mongoose'

interface User {
  id: string;
  mood: string;
  actions: string[];
}

const addUser = (
  roomId: string,
  userId: string,
  firstname: string,
  lastname: string,
  socketId: string
): void => {
  asyncSadd(`users_list-${roomId}`, userId);
  asyncHmset(
    `users-${socketId}`,
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

const getUsersInfosEmojis = async (emoji:string, roomId:number) => {
  const userListPerEmojis:string[] = await asyncSMembers(`${emoji}-${roomId}`);
  console.log('userListPerEmojis', userListPerEmojis)
  const objectIds = userListPerEmojis.map(id => Types.ObjectId(id));
  console.log('objectIds', objectIds)

  // récupérer que le nom/prénom
  const user = await Users.find({_id: {$in: objectIds}},{_id:1, firstname:1, lastname:1});
  console.log('user', user, )

  return user;
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

const removeUser = async (socketId: string): Promise<string> => {
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
  removeUser,
  getUserCount,
  getMoodCounter,
  getUserInfos,
  getUsersInfosEmojis
};

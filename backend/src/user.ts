import { asyncHincrby, asyncHgetall,asyncFlushDB } from './database/redis';
import { parseIntHget, MoodCounter } from './shared/utils';

const users: User[] = [];

interface User {
  socketId: string;
  mood: string;
  actions: string[];
}

const moodCounter: MoodCounter = {
  happy: 0,
  dead: 0,
  thinking: 0,
  coffee: 0,
  slowDown: 0,
  question: 0,
};

/* eslint-disable no-plusplus */
/* eslint-disable  @typescript-eslint/no-explicit-any */

const addUser = (id: string): void => {
  users.push({ socketId: id, mood: 'default', actions: [] });
};

const getUserCount = (): number => {
  return users.length;
};

const getUserInfos = (id: string): User => {
  const currentUser = users.findIndex((user) => user.socketId === id);
  return users[currentUser];
};

const updateEmojisCount = async (
  name: string,
  id: string,
  category: string
): Promise<void> => {
  const currentUser = users.findIndex((user) => user.socketId === id);
  if (category === 'Emotion' && users[currentUser]?.mood !== name) {
    // recupère toutes les actions à effectuer vers redis
    const promises = [];
    // si mood !== default (happy, dead, thinking)
    if (users[currentUser]?.mood !== 'default') {
      // decremente le compteur de l'autre mood émotion
      const decrement = asyncHincrby(
        'moodcounter',
        users[currentUser]?.mood,
        -1
      );
      promises.push(decrement);
    }
    // On remplace l'ancienne émotion par la nouvelle
    users[currentUser].mood = name;

    // incremente le nouveau mood emotion
    const increment = asyncHincrby('moodcounter', users[currentUser]?.mood, 1);
    promises.push(increment);
    // envoie en même temps l'increment et le decrement afin d'éviter les bugs de décalages de compteurs d'emotions
    Promise.all(promises);
  } else if (category === 'Action') {
    // si l'action n'est pas dans le moodCounter
    if (users[currentUser]?.actions.indexOf(name) === -1) {
      // ajoute l'action
      users[currentUser]?.actions.push(name);
      await asyncHincrby('moodcounter', name, 1);
    } else {
      // sinon annule l'action
      const actionIndex = users[currentUser]?.actions.indexOf(name);
      users[currentUser]?.actions.splice(actionIndex, 1);
      await asyncHincrby('moodcounter', name, -1);
    }
  }
};

const getMoodCounter = async (roomId = 'moodcounter'): Promise<MoodCounter> => {
  // Commande pour RAZ la database : 
  // await asyncFlushDB()

  // récupère le moodcounter de la bdd (string)
  const redisMoodCounter = await asyncHgetall(roomId);

  if (!redisMoodCounter) {
    return moodCounter;
  }

  // copie du nouveau moodcounter (number)
  const moodCounterCopy: MoodCounter = { ...moodCounter };

  // mise à jour du moodcounter en number et non string
  const newMoodCounter = parseIntHget(moodCounterCopy, redisMoodCounter);
  return newMoodCounter;
};

const removeUser = async (id: string): Promise<void> => {
  const index = users.findIndex((user) => user.socketId === id);
  
  if (index !== -1) {
    // remove emotion & actions from emojisCount
    const userMood = users[index].mood;
    const userActions = users[index].actions;

    if (userActions.length > 0) {
      userActions.map(async(action) => {
        // supprime les actions de l'user
        await asyncHincrby('moodcounter', action, -1);
      });
    }
    // supprime l'émotion de l'user si !== 'default'
    if (userMood !== 'default') {
      await asyncHincrby(
        'moodcounter',
        userMood,
        -1
      );
    }

    // remove user
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    users.splice(index, 1)[0];
  }
};

export {
  addUser,
  updateEmojisCount,
  removeUser,
  getUserCount,
  getMoodCounter,
  getUserInfos,
};

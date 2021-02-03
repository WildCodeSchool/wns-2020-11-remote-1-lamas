const users: User[] = [];

interface User {
  socketId: string;
  mood: string;
  actions: string[];
}

interface MoodCounter {
  [k: string]: number;
}

let moodCounter: MoodCounter = {
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

const getEmojisCount = (name: string, id: string, category: string): void => {
  const currentUser = users.findIndex((user) => user.socketId === id);

  if (category === 'Emotion' && users[currentUser].mood !== name) {
    moodCounter[users[currentUser].mood]--;
    users[currentUser].mood = name;
    moodCounter[name]++;
  } else if (category === 'Action') {
    if (users[currentUser]?.actions.indexOf(name) === -1) {
      users[currentUser].actions.push(name);
      moodCounter[name]++;
    }
  }
};

const getMoodCounter = (): MoodCounter => {
  return moodCounter;
};

const removeUser = (id: string): void => {
  const index = users.findIndex((user) => user.socketId === id);
  if (index !== -1) {
    // remove emotion & actions from emojisCount
    const userMood = users[index].mood;
    const userActions = users[index].actions;
    if (userActions.length > 0) {
      userActions.map((actions) => {
        moodCounter[actions]--;
      });
    }
    moodCounter[userMood]--;
    // remove user
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    users.splice(index, 1)[0];
  }
};

export {
  addUser,
  getEmojisCount,
  removeUser,
  getUserCount,
  getMoodCounter,
  getUserInfos,
};

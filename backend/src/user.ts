const users: User[] = [];

interface User {
  socketId: string;
  mood: string;
  action: string[];
}

interface MoodCounter {
  [k: string]: number;
}

const moodCounter: MoodCounter = {
  happy: 0,
  dead: 0,
  thinking: 0,
  coffee: 0,
  slowDown: 0,
  question: 0,
};

const addUser = (id: string): void => {
  users.push({ socketId: id, mood: 'default', action: [] });
};

const getUserCount = (): number => {
  return users.length;
};

const IncrementEmojis = (name: string, id: string, category: string): void => {
  const currentUser = users.findIndex((user) => user.socketId === id);

  if (category === 'Emotion' && users[currentUser].mood !== name) {
    moodCounter[users[currentUser].mood]--;
    users[currentUser].mood = name;
    moodCounter[name]++;
  } else if (category === 'Action') {
    if (users[currentUser]?.action.indexOf(name) === -1) {
      users[currentUser].action.push(name);
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
    const userActions = users[index].action;
    if (userActions.length > 0) {
      userActions.map((action) => {
        moodCounter[action]--;
      });
    }
    moodCounter[userMood]--;
    // remove user
    users.splice(index, 1)[0];
  }
};

export { addUser, IncrementEmojis, removeUser, getUserCount, getMoodCounter };

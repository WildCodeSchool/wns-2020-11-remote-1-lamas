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
  Happy: 0,
  Dead: 0,
  Thinking: 0,
  Break: 0,
  SlowDown: 0,
};

const addUser = (id: string): void => {
  console.log('socket id: ', id);
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
    if (users[currentUser].action.indexOf(name) === -1) {
      users[currentUser].action.push(name);
      users[currentUser].mood = name;
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
    // eslint-disable-next-line no-unused-expressions
    users.splice(index, 1)[0];
  }
};

export { addUser, IncrementEmojis, removeUser, getUserCount, getMoodCounter };

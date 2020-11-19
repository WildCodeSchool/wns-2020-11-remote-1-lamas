const users = [];

const moodCounter = {
  Happy: 0,
  Dead: 0,
  Thinking: 0,
  Break: 0,
  SlowDown: 0,
};

const addUser = (id) => {
  users.push({ socketId: id, mood: 'default', action:[] });
};

const getUserCount = () => {
  return users.length;
};

const IncrementEmojis = (name, id, category) => {
  const currentUser = users.findIndex((user) => user.socketId === id);

  if (category === 'Emotion' && users[currentUser].mood !== name) {
    moodCounter[users[currentUser].mood]--;
    users[currentUser].mood = name;
    moodCounter[name]++;
  } else if (category === 'Action') {
    if(users[currentUser].action.indexOf(name) === -1) {
      users[currentUser].action.push(name)
      users[currentUser].mood = name;
      moodCounter[name]++;
    }
  }
};

const getMoodCounter = () => {
  return {moodCounter}
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.socketId === id);

  if (index !== -1) {
    // eslint-disable-next-line no-unused-expressions
    users.splice(index, 1)[0];
  }
};

module.exports = {
  addUser,
  IncrementEmojis,
  removeUser,
  getUserCount,
  getMoodCounter,
};

const users = [];

const moodCounter = {
  Happy: 0,
  Dead: 0,
  Thinking: 0,
  Break: 0,
  SlowDown: 0,
};

const addUser = (id) => {
  users.push({ socketId: id, mood: 'default' });
};

const getUserCount = () => {
  return users.length;
};

const getIncrement = (name, id, category) => {
  const currentUser = users.findIndex((user) => user.socketId === id);
  const userCounter = users.length;

  if (category === 'Emotion' && users[currentUser].mood === 'default') {
    users[currentUser].mood = name;
    moodCounter[name]++;
  } else if (category === 'Action') {
    users[currentUser].mood = name;
    moodCounter[name]++;
  }

  return {
    moodCounter,
    userCounter,
  };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.socketId === id);

  if (index !== -1) {
    // eslint-disable-next-line no-unused-expressions
    users.splice(index, 1)[0];
  }
};

module.exports = {
  addUser,
  getIncrement,
  removeUser,
  getUserCount,
};

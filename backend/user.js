const users = [];

const addUser = async (id) => {
  await users.push(id)
  return users.length
}

module.exports = {
    addUser
}
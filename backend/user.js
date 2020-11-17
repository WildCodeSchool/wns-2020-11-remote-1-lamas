const users = [];

const addUser =  (id) => {
   users.push(id)
  return users.length
}

module.exports = {
    addUser
}
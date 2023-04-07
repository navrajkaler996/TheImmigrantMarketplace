const addUser = (users, userId, socketId) => {
  const user = users.find((u) => u.userId === userId);
  if (!user) {
    users.push({ userId, socketId });
  }

  return users;
};

const removeUser = (users, socketId) => {
  const newUsers = users.filter((u) => u.socketId !== socketId);

  return newUsers;
};

const getUser = (users, userId) => {
  const user = users.find((u) => u.userId === userId);
  console.log("ssss", users, userId);
  return user;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
};

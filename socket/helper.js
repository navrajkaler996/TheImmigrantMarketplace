export const addUser = (users, userId, socketId) => {
  const user = users.find((u) => u.userId === userId);
  if (!user) {
    users.push({ userId, socketId });
  }
  return users;
};

export const removeUser = (users, socketId) => {
  const newUsers = users.filter((u) => u.socketId !== socketId);

  return newUsers;
};

export const getUser = (users, userId) => {
  const user = users.find((u) => u.userId === userId);
  return user;
};

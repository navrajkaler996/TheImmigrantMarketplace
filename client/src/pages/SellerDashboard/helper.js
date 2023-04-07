export const getRecieverId = (chats, chatId, id) => {
  const conversations = chats?.chatData?.conversations?.find(
    (c) => c._id === chatId
  );

  const recieverId = conversations?.members?.find((i) => i !== id);

  return recieverId;
};

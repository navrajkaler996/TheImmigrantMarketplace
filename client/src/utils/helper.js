export const reverseDate = (date) => {
  let temp = date.split("-").reverse().join("-");
  return temp;
};

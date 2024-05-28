export const validateUserName = (userName) => {
  if (userName === "") {
    return false;
  }
  const checkNumbers = userName.match(/\d+/g);
  if (checkNumbers) {
    return false;
  }

  return true;
};

export const validatePassword = (password) => {
  if (password === "") {
    return false;
  }
};

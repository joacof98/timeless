module.exports.validateLogin = (username, password) => {
  let errors = {};
  if (!username || !password) {
    errors.fields = "The fields cannot be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateRegister = ({
  username,
  password,
  confirmPassword,
  email
}) => {
  const errors = {};
  if (!username || !password || !confirmPassword || !email) {
    errors.fields = "The fields cannot be empty.";
  }
  
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  if (!email.match(regEx)) {
    errors.email = "The email does not have the correct format.";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "The passwords doesnt match.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateInputPost = (title) => {
  let errors = {};
  if (!title) {
    errors.fields = "The fields cannot be empty.";
  }
  if(title.length > 70 || title.length < 4) {
    errors.fields = "The title must be between 5 and 70 characters."
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
const mongoose = require('mongoose')
const Post = require("../models/Post");

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

// Validate the title of post, for endpoint to create one.
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

module.exports.validatePostId = async (post_id) => {
  let errors = {}
  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    errors.badFormat = "The id doesnt have the right format."
  } else {
    const post = await Post.findById(post_id);
    if (!post) {
      errors.notFound = "The post doesnt exists."
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateHabit = (name,description) => {
  let errors = {}
  if (!name || !description) {
    errors.fields = "The fields name or description cannot be empty.";
  }
  else if(name.length > 70 || name.length < 4) {
    errors.fields = "The name of the habit must be between 5 and 70 characters."
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
};
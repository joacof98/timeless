interface UserRegisterInput {
  username: String,
  email: String,
  password: String,
  confirmPassword: String
}

interface UserLoginInput {
  username: String,
  password: String
}

interface UserInfo {
  username: String,
  email: String,
  imageUrl: String,
  createdAt: String,
  followers: Array,
  following: Array,
  habits: Array
}

// Users
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

// Posts
interface PostInfo {
  username: String,
  title: String,
  createdAt: String,
  description: String,
  imageUrl: String,
  videoUrl: String,
  likes: Array,
  comments: Array
}
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

interface UserUpdateInfo {
  username: String,
  imageUrl: String
}

interface UserHabitInput {
  name: string,
  description: string,
  to_avoid: string,
  color: string
}

interface Habit extends UserHabitInput {
  _id: string,
  currentStreak: {
    day: number,
    lock: string
  }
}

// Posts
interface PostInfo {
  username: String,
  title: string,
  createdAt: String,
  description: String,
  imageUrl: String,
  videoUrl: String,
  likes: Array,
  comments: Array
}

// Phrases
interface Phrase {
  text: string,
  author: string
}

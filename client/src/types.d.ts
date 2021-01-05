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
  _id: string,
  username: string,
  title: string,
  createdAt: string,
  description: string,
  imageUrl: string,
  videoUrl: string,
  likes: Array,
  comments: Array
}

interface UserPostInput {
  title: string,
  description: string,
  imageUrl: string,
  videoUrl: string
}

// Phrases
interface Phrase {
  text: string,
  author: string
}

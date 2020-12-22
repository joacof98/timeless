const { model, Schema } = require('mongoose');

// 'habits' is embedded for one-to-few and because is too simple.
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: String,
  createdAt: { type: String, required: true },
  lock: { type: String, required: true },
  followers: [{username: String}],
  following: [{username: String}],
  habits: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      currentStreak: {
        day: Number,
        lock: String,
      },
      color: String,
      to_avoid: String,
    },
  ],
});

module.exports = model('User', userSchema);
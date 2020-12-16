const { model, Schema } = require("mongoose");

// likes, comments maybe need another Collection (1..N relation).
// For practical uses, the fields are embedded in the Post.
const postSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: String, required: true },
  description: String,
  imageUrl: String,
  videoUrl: String,
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ]
});

module.exports = model('Post', postSchema);
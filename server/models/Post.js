const { model, Schema } = require('mongoose');

const postSchema = new Schema({
	username: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: { type: String, required: true },
    description: String,
    imageUrl: String,
    videoUrl: String
});

module.exports = model('Post', postSchema);
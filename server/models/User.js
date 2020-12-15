const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: String,
    createdAt: { type: String, required: true },
    lock: { type: String, required: true },
    followers: { type: Number, required: true },
    following: { type: Number, required: true }
});

module.exports = model('User', userSchema);
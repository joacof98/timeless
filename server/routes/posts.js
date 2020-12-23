const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const { checkAuth } = require("../util/checkAuth");
const { validatePostId } = require("../util/validators")
const { validateInputPost } = require("../util/validators")

let router = express.Router()

// GET - All posts
router.get("/", async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.send(posts);
});

// GET - Get one post by id
router.get("/:id", async (req, res) => {
  const {valid, errors} = await validatePostId(req.params.id)
  if(!valid) return res.status(400).send(errors)

  const post = await Post.findById(req.params.id);
  res.send(post)
})

// GET - Get all posts of one user
router.get("/u/:username", async (req, res) => {
  const username = req.params.username
  const posts = await Post.find({username}).sort({ createdAt: -1 });
  res.send(posts);
});

// DELETE - Delete One post by id.
router.delete("/:id", checkAuth, async (req, res) => {
  const {valid, errors} = await validatePostId(req.params.id)
  if(!valid) return res.status(400).send(errors)
  const post = await Post.findById(req.params.id);

  if (req.user.username !== post.username) {
    return res.status(401).send({
      unauthorized: "You do not have permissions to delete this post.",
    });
  } else {
    await post.delete();
    res.send({ success: "Post deleted succesfully!" });
  }
});

/* POST - Create one post.
Check for lock and actual time, and if its correct, create the post and update the lock.
*/
router.post("/create", checkAuth, async (req, res) => {
  const { title, description, imageUrl, videoUrl } = req.body;
  const user_db = await User.findOne({username: req.user.username})
  const this_moment = new Date()
  const lock = new Date(user_db.lock);
  
  if (this_moment < lock) {
    const end_date = {
      day: lock.toISOString().split("T")[0],
      hours: Math.round(((lock - this_moment) / 1000) / 3600),
    };
    return res.status(403).send({
      lock: `You cannot post yet, your endless wait ends the ${end_date.day}. ` +
      `${end_date.hours} hours left, be patient.`
    });
  } else {
    const {errors, valid} = validateInputPost(title)
    if(!valid) return res.status(400).send(errors)

    let newPost = new Post({
      username: req.user.username,
      title,
      createdAt: this_moment.toISOString()
    })
    if(description) newPost.description = description
    if(imageUrl) newPost.imageUrl = imageUrl
    if(videoUrl) newPost.videoUrl = videoUrl

    await newPost.save()
    user_db.lock = new Date(this_moment.setMonth(this_moment.getMonth() + 1)).toISOString()
    await user_db.save()
    res.send({success: "Post created successfully!"})
  }
});

// PUT - Like/Dislike a Post given an id.
router.put("/like/:id", checkAuth, async (req, res) => {
  const username_logged = req.user.username;
  const post_id = req.params.id;
  const { valid, errors } = await validatePostId(post_id);
  if (!valid) return res.status(400).send(errors);

  const post = await Post.findById(post_id);
  if (post.likes.find((like) => like.username === username_logged)) {
    post.likes = post.likes.filter((like) => like.username !== username_logged);
  } else {
    post.likes.push({
      username: username_logged,
      createdAt: new Date().toISOString(),
    });
  }
  await post.save();
  res.send(post);
});

module.exports = router
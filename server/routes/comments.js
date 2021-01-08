const express = require("express");
const Post = require("../models/Post");
const { checkAuth } = require("../util/checkAuth");
const {validatePostId} = require('../util/validators')

let router = express.Router()

// POST - Create comment in specified post of some user.
router.post("/", checkAuth, async (req, res) => {
  const {body, post_id} = req.body
  const {valid, errors} = await validatePostId(post_id)
  if(!valid) return res.status(400).send(errors)

  const post = await Post.findById(post_id);
  if(body.trim() === '') {
    return res.status(400).send({
      empty: "Comment must not be empty."
    })
  } else {
    post.comments.unshift({
      body,
      username: req.user.username,
      createdAt: new Date().toISOString()
    })
    const post_updated = await post.save()
    res.send(post_updated)
  }
})

// POST - Delete a comment of a post.
router.post("/delete", checkAuth, async (req, res) => {
  const {comment_id, post_id} = req.body
  const {valid, errors} = await validatePostId(post_id)
  if(!valid) return res.status(400).send(errors)

  const post = await Post.findById(post_id);
  const commentIndex = post.comments.findIndex(c => c.id === comment_id);
  if(commentIndex == -1) {
    return res.status(400).send({
      notFound: "The comment doesnt exists"
    })
  }
  
  post.comments.splice(commentIndex,1);
	const post_updated = await post.save();
  res.send(post_updated);
})

module.exports = router

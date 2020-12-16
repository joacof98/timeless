const express = require("express");
const Post = require("../models/Post");
const { checkAuth } = require("../util/checkAuth");
const mongoose = require("mongoose")

let router = express.Router()

// POST - Create comment in specified post of some user.
router.post("/", checkAuth, async (req, res) => {
  const {body, post_id} = req.body
  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).send({
      badFormat: "The id doesnt have the right format.",
    });
  }
  const post = await Post.findById(post_id);
  if (!post) {
    return res.status(400).send({
      notFound: "The post doesnt exists.",
    });
  }

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
    await post.save()
    res.send({success: "Comment added!"})
  }
})

// POST - Delete a comment of a post.
router.post("/delete", checkAuth, async (req, res) => {
  const {comment_id, post_id} = req.body
  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).send({
      badFormat: "The id doesnt have the right format.",
    });
  }
  const post = await Post.findById(post_id);
  if (!post) {
    return res.status(400).send({
      notFound: "The post doesnt exists.",
    });
  }

  const commentIndex = post.comments.findIndex(c => c.id === comment_id);
  if(commentIndex == -1) {
    return res.status(400).send({
      notFound: "The comment doesnt exists"
    })
  }
  if (req.user.username !== post.comments[commentIndex].username) {
    return res.status(401).send({
      unauthorized: "You do not have permissions to delete this comment.",
    });
  } else {
    post.comments.splice(commentIndex,1);
		await post.save();
    res.send({ success: "Comment deleted succesfully!" });
  }
})

module.exports = router

const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const { checkAuth } = require("../util/checkAuth");
const mongoose = require('mongoose')

let router = express.Router()

router.get("/", async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.send(posts);
});

router.delete("/:id", checkAuth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({
      badFormat: "The id doesnt have the right format.",
    });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).send({
      notFound: "The post doesnt exists.",
    });
  }

  if (req.user.username !== post.username) {
    return res.status(401).send({
      unauthorized: "You do not have permissions to delete this post.",
    });
  } else {
    await post.delete();
    res.send({ success: "Post deleted succesfully!" });
  }
});

router.post("/create", checkAuth, (req, res) => {
  const { title, description, imageUrl, videoUrl } = req.body;
  const this_moment = new Date().toISOString();
  const lock = req.user.lock;
  if (this_moment < lock) {
    const end_date = {
      day: lock.split("T")[0],
      hours: Math.round((lock - this_moment / 1000) / 3600),
    };
    return res.status(403).send({
      lock: `You cannot post yet, your endless wait ends the ${end_date.day}.
      ${end_date.hours} left, be patient.`
    });
  }
});

module.exports = router
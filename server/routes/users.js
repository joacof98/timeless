const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { validateRegister, validateLogin } = require("../util/validators");
const { SECRET_KEY } = require("../config");
const { checkAuth } = require("../util/checkAuth");
let router = express.Router();

const generateToken = (userInfo) => {
  return jwt.sign(
    {
      id: userInfo.id,
      username: userInfo.username,
      imageUrl: userInfo.imageUrl,
      lock: userInfo.lock
    },
    SECRET_KEY,
    { expiresIn: "4h" }
  );
};

// POST - Register one user
router.post("/register", async (req, res) => {
  let { username, password, email } = req.body;
  const { errors, valid } = validateRegister(req.body);
  if (!valid) {
    return res.status(400).send(errors);
  }

  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).send({
      username: "The user already exists.",
    });
  }

  password = await bcrypt.hash(password, 12);
  const newUser = new User({
    username,
    password,
    email,
    imageUrl: "https://i.imgur.com/GBg52yB.png",
    createdAt: new Date().toISOString(),
    lock: new Date().toISOString(),
    followers: 0,
    following: 0,
  });

  const result = await newUser.save();
  const token = generateToken(result);

  res.send({
    ...result._doc,
    id: result._id,
    token,
  });
});

// POST - Login user
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  const { errors, valid } = validateLogin(username, password);
  if (!valid) return res.status(400).send(errors);

  const user = await User.findOne({ username });
  if (!user) {
    errors.username = "The user doesnt exist";
    return res.status(400).send(errors);
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    errors.passwordMatch = "The password doesnt match";
    return res.status(400).send(errors);
  }

  const token = generateToken(user);
  res.send({
    ...user._doc,
    id: user._id,
    token,
  });
});

// GET - Get basic info of user
router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    return res.status(400).send({
      notFound: "The user doesnt exists.",
    });
  }

  const userInfo = {
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl,
    followers: user.followers,
    following: user.following,
    habits: user.habits
  };
  res.send(userInfo);
});

/* PUT - Change profile information.
(the path is taken from token, no problem with errors or logged state.)
*/
router.put("/:username", async (req, res) => {
  const my_user = await User.findOne({username: req.params.username})
  let {username, imageUrl} = req.body
  if (username) {
    const user_to_change = await User.findOne({username})
    if(user_to_change) {
      return res.status(400).send({
        username: "The username is already taken.",
      });
    } else {
      my_user.username = username
      await my_user.save()
      res.send({updateSuccess: "Updated succesfully!"})
    }
  }
  if(imageUrl) {
    my_user.imageUrl = imageUrl
    await my_user.save()
    res.send({updateSuccess: "Updated succesfully!"})
  }

})

// POST -  Follow/Unfollow an user with the given username and the indication
router.post("/follow", checkAuth, async (req, res) => {
  const {follow, username} = req.body
  const user_to_follow = await User.findOne({username})
  user_to_follow.followers = user_to_follow.followers + follow
  await user_to_follow.save()

  const my_user = await User.findOne({username: req.user.username})
  my_user.following = my_user.following + follow
  await my_user.save()

  res.send({success: "Following"})
})


module.exports = router
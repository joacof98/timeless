const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const { MONGOURI } = require("./config");

const app = express();

// Middlewares
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Routes
const users = require('./routes/users');
const posts = require('./routes/posts');
app.use('/users/', users)
app.use('/posts/', posts)

mongoose
  .connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Db Connected!"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Server running in port " + PORT);
});
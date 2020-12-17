const express = require("express");
const User = require('../models/User')
let router = express.Router()
const {checkAuth} = require('../util/checkAuth')
const {validateHabit} = require('../util/validators')

// POST - Create a new habit
router.post("/create", checkAuth, async (req, res) => {
  const {name, description, color, to_avoid} = req.body
  const {valid, errors} = validateHabit(name, description)
  if(!valid) return res.status(400).send(errors)

  const user = await User.findOne({username: req.user.username})
  user.habits.push({
    name,
    description,
    currentStreak: {
      day: 0,
      lock: new Date().toISOString()
    },
    color,
    to_avoid
  })

  const result = await user.save()
  res.send(result)
})

// DELETE - Delete one habit by id
router.delete("/:id", checkAuth, async (req, res) => {
  const habit_id = req.params.id
  const user = await User.findOne({username: req.user.username})
  const habitIndex = user.habits.findIndex(h => h.id === habit_id);
  if(habitIndex == -1) {
    return res.status(400).send({
      notFound: "The habit doesnt exists"
    })
  }

  user.habits.splice(habitIndex,1);
	await user.save();
  res.send({ success: "Habit deleted succesfully!" });
})

// PUT - Update the current streak (days implementing the habit)
router.put("/:id", checkAuth, async (req, res) => {
  const habit_id = req.params.id
  const user = await User.findOne({username: req.user.username})
  const habitIndex = user.habits.findIndex(h => h.id === habit_id);
  const habit_to_update = user.habits[habitIndex]

  const today = new Date()
  const lock = new Date(habit_to_update.currentStreak.lock)
  if(lock > today){
    return res.status(403).send({
      lock: "Come back tomorrow, please."
    })
  } else {
    habit_to_update.currentStreak.day += 1
    habit_to_update.currentStreak.lock = new Date(today.setDate(today.getDate() + 1)).toISOString()
    await user.save()
    res.send({success: "One day more! keep going"})
  }
})

module.exports = router
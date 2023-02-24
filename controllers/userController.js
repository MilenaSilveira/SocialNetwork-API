const User = require("../models/User");

module.exports = {

findUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},

findOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")

      .then((user) =>
        !user
          ? res.status(404).json({ message:"No user matches this ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId }, 
        { $set: req.body })

      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user matches this ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })

      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.status(200).json({ message: "User deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user matches this ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user matches this ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

};
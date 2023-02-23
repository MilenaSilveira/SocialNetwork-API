const Thought = require("../models/Thought");

module.exports = {

    findThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.status(200).json(thoughts))
            .catch((err) => res.status(500).json(err))
    },

    findOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought matches this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: "No user found with that Id. "
                    })
                    : res.status(200).json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought matches this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought matches this ID" })
                    : res.status(200).json({ message: "Thought deleted" })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought matches this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body } }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought matches this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

};


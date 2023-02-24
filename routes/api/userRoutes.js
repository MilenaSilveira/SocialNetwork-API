const router = require("express").Router();
const {
  findUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(findUsers).post(createUser);

router.route("/:id")
.get(findOneUser)
.put(updateUser)
.delete(deleteUser);

router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;
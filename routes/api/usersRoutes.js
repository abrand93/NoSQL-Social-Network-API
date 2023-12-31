const router = require('express').Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  deleteSingleUser,
  addFriend,
  updateUser,
  deleteSingleFriend
  
  
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser) .delete(deleteSingleUser).put(updateUser);

// // /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteSingleFriend);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;

const router = require('express').Router();
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

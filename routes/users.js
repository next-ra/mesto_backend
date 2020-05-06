const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateAvatar
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUser);
router.patch('/:userId', updateUser);
router.patch('/:userId/avatar', updateAvatar);

module.exports = router;

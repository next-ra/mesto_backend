const router = require('express').Router();
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateAvatar
} = require('../controllers/users');
const {
  updateAvatarValidation,
  updateUserValidation
} = require('../middlewares/celebrate');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUser);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;

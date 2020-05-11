const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');
const { checkOwner } = require('../middlewares/checkOwner');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', checkOwner, deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
module.exports = router;

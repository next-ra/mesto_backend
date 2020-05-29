const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');
const { checkOwner } = require('../middlewares/checkOwner');
const { checkCard } = require('../middlewares/checkCard');
const { createCardValidation } = require('../middlewares/celebrate');

router.post('/', createCardValidation, createCard);
router.get('/', getCards);
router.delete('/:cardId', checkCard, checkOwner, deleteCard);
router.put('/:cardId/likes', checkCard, likeCard);
router.delete('/:cardId/likes', checkCard, dislikeCard);
module.exports = router;

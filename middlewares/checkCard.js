const Card = require('../models/card');
const { cardsRes } = require('../libs/messages');
const NotFound = require('../errors/notFound');

module.exports.checkCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFound(cardsRes.cardNotFound))
    .then(card => {
      req.card = card;
      next();
    })
    .catch(next);
};

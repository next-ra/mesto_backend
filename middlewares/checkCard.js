const Card = require('../models/card');
const { messages } = require('../libs/messages');
const NotFound = require('../libs/notFound');

module.exports.checkCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFound(messages.cards.cardNotFound))
    .then(card => {
      req.card = card;
      next();
    })
    .catch(next);
};

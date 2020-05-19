const Card = require('../models/card');
const { messages } = require('../libs/messages');
const NotFound = require('../libs/notFound');

module.exports.checkCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (!card) {
        throw new NotFound(messages.cards.cardNotFound);
      }
      next();
    })
    .catch(next);
};

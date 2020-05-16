const Card = require('../models/card');
const BadRequest = require('../libs/badRequest');
const { messages } = require('../libs/messages');

module.exports.checkOwner = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => {
      if (req.user._id !== String(card.owner)) {
        throw new BadRequest(messages.cards.cardFailDelete);
      }
      next();
    })
    .catch(next);
};

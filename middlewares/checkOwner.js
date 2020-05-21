const BadRequest = require('../libs/badRequest');
const { messages } = require('../libs/messages');

module.exports.checkOwner = (req, res, next) => {
  if (req.user._id !== String(req.card.owner)) {
    throw new BadRequest(messages.cards.cardFailDelete);
  } else next();
};

const Card = require('../models/card');
const { messages } = require('../libs/messages');

module.exports = {
  createCard: (req, res, next) => {
    Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id
    })
      .then(card =>
        res
          .status(201)
          .send({ message: messages.cards.cardCreated, data: card })
      )
      .catch(next);
  },
  getCards: (req, res, next) => {
    Card.find({})
      .then(cards => res.send({ data: cards }))
      .catch(next);
  },
  deleteCard: (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
      .then(card => {
        if (!card) {
          res.status(400).send({ message: messages.cards.cardNotFound });
        } else res.send({ message: messages.cards.cardDeleted, data: card });
      })
      .catch(err => res.send(err));
  },
  likeCard: (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id }
      },
      { new: true }
    )
      .then(card => {
        if (!card) {
          next();
        } else res.send({ message: messages.cards.like, data: card });
      })
      .catch(next);
  },
  dislikeCard: (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id }
      },
      { new: true }
    )
      .then(card => {
        if (!card) {
          next();
        } else res.json({ message: messages.cards.dislike, data: card });
      })
      .catch(next);
  }
};

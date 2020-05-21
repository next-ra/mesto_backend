const Card = require('../models/card');
const { messages } = require('../libs/messages');

const createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id
  })
    .then(card =>
      res.status(201).send({ message: messages.cards.cardCreated, data: card })
    )
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.deleteOne(req.card)
    .then(res.send({ message: messages.cards.cardDeleted, data: req.card }))
    .catch(next);
};

const likeCard = (req, res, next) => {
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
};

const dislikeCard = (req, res, next) => {
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
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
};

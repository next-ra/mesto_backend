const Card = require('../models/card');

module.exports = {
  createCard: (req, res, next) => {
    Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id
    })
      .then(card => res.status(201).send({ data: card }))
      .catch(err => res.send(err));
  },
  getCards: (req, res, next) => {
    Card.find({})
      .then(cards =>
        res.send({ 'количество карточек': cards.length, data: cards })
      )
      .catch(err => res.send(err));
  },
  deleteCard: (req, res, next) => {
    Card.findByIdAndRemove(req.params.cardId)
      .then(card => {
        if (!card) {
          next();
        } else res.send({ message: 'Карточка удалена', data: card });
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
        } else res.send({ message: 'лайк поставлен', data: card });
      })
      .catch(err => res.send(err));
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
        } else res.json({ message: 'Лайк убран', data: card });
      })
      .catch(err => res.send(err));
  }
};

const { messages } = require('../libs/messages');

module.exports = {
  errors: (err, req, res, next) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: messages.wrongIdFormat });
    } else if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: messages.users.notFound });
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ message: err.message });
    } else if (err.name === 'MongoError') {
      res.status(403).send({ message: messages.dupEmail });
    } else res.status(500).send({ message: messages.serverErr });
  },
  error404: (req, res, next) => {
    res.status(404).json({ message: messages.notFound });
    next();
  }
};

const { messages } = require('../libs/messages');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  errors: (err, req, res, next) => {
    switch (err.name) {
      // case 'Error':
      //   res.status(401).send({ message: messages.users.wrongAuth });
      //   break;

      case 'CastError':
        res.status(400).send({ message: messages.wrongIdFormat });
        break;

      case 'DocumentNotFoundError':
        res.status(404).send({ message: messages.users.notFound });
        break;

      case 'ValidationError':
        res.status(400).send({ message: err.message });
        break;

      case 'MongoError':
        res.status(403).send({ message: messages.dupEmail });
        break;

      default:
        res
          .status(err.status || 500)
          .send({ message: err.message || 'ошибка сервера' });
    }
  },
  error404: (req, res, next) => {
    res.status(404).json({ message: messages.notFound });
    next();
  },
  error401: res => {
    res.status(401).send({ message: messages.users.needAuth });
  }
};

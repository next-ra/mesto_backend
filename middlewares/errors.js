module.exports = {
  errors: (err, req, res, next) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'неправильный формат id' });
    } else if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'пользователь с таким id не найден' });
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ message: err.message });
    } else res.status(500).send({ message: 'ошибка сервера' });
  },
  error404: (req, res, next) => {
    res.status(404).json({ message: 'запрашиваемый ресурс не найден' });
    next();
  }
};

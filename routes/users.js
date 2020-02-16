const express = require('express');
const users = require('../data/users');

const router = express.Router();

// получение списка пользователей
router.get('/', (req, res) => res.json(users));

// получение данных конкретного пользователя
router.get('/:id', (req, res) => {
  const found = users.some(user => user._id === req.params.id);

  if (found) {
    res.json(users.filter(user => user._id === req.params.id));
  } else {
    res
      .status(400)
      .json({ msg: `Нет пользователя с таким id ${req.params.id}` });
  }
});

module.exports = router;

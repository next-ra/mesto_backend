const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const users = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  const fileReader = fs.createReadStream(users, 'utf8');
  res.set('Content-Type', 'application/json');
  fileReader.pipe(res);
});

router.get('/:id', (req, res) => {
  fs.readFile(users, 'utf8', (err, data) => {
    if (err) {
      res.status(500).res.json({ message: 'Что-то пошло не так' });
    }
    const foundUser = JSON.parse(data).find(user => user._id === req.params.id);
    return foundUser
      ? res.send(foundUser)
      : res
          .status(404)
          .json({ message: `Нет пользователя с таким id ${req.params.id}` });
  });
});
module.exports = router;

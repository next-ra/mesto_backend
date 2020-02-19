const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const cards = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  const fileReader = fs.createReadStream(cards, 'utf8');
  res.set('Content-Type', 'application/json');
  fileReader.pipe(res);
});

module.exports = router;

const express = require('express');
const cards = require('../data/cards');

const router = express.Router();

router.get('/', (req, res) => res.json(cards));
module.exports = router;

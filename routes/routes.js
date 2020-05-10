const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const { errors, error404 } = require('../middlewares/errors');

router.use('/users', users);
router.use('/cards', cards);
router.use('/', errors);
router.use('/*', error404);
module.exports = router;

const router = require('express').Router();
const cookieParser = require('cookie-parser');
const users = require('./users');
const cards = require('./cards');
const { errors, error404 } = require('../middlewares/errors');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(cookieParser());

router.post('/signup', createUser);
router.post('/signin', login);
router.use(auth);
router.use('/users', users);
router.use('/cards', cards);
router.use('/', errors);
router.use('/*', error404);
module.exports = router;

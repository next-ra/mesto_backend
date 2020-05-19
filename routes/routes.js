const router = require('express').Router();
const cookieParser = require('cookie-parser');
const users = require('./users');
const cards = require('./cards');
const { errors, error404 } = require('../middlewares/errors');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  createUserValidation,
  loginValidation
} = require('../middlewares/celebrate');

router.use(cookieParser());

router.get('/crash-test', () => {
  setTimeout(() => {
    console.log('сервер упал');
    throw new Error('Сервер сейчас упадёт');
  }, 4000);
});

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.use('/users', users);
router.use('/cards', cards);
router.use('/', errors);
router.use('/*', error404);
module.exports = router;

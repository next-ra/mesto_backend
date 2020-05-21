const router = require('express').Router();
const cookieParser = require('cookie-parser');
const users = require('./users');
const cards = require('./cards');
const { errors } = require('../middlewares/errorsHandler');
const { show404 } = require('../middlewares/show404');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  createUserValidation,
  loginValidation
} = require('../middlewares/celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(cookieParser());

router.get('/crash-test', () => {
  setTimeout(() => {
    console.log('сервер упал');
    throw new Error('Сервер сейчас упадёт');
  }, 4000);
});
router.use(requestLogger);
router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.use('/users', users);
router.use('/cards', cards);
router.use(errorLogger);
router.use('/*', show404);
router.use('/', errors);

module.exports = router;

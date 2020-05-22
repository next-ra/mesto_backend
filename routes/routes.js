const router = require('express').Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('../middlewares/limiter');
const {
  celebrateErrorHandler
} = require('../middlewares/celebrateErrorHandler');
const users = require('./users');
const cards = require('./cards');
const { errorsHandler } = require('../middlewares/errorsHandler');
const { show404 } = require('../middlewares/show404');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  createUserValidation,
  loginValidation
} = require('../middlewares/celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(limiter);
router.use(helmet());
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
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
router.use(celebrateErrorHandler);
router.use('/', errorsHandler);

module.exports = router;

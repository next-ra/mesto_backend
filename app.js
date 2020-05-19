require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes/routes');
const config = require('./config');
const limiter = require('./middlewares/limiter');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

app.use(routes);
mongoose
  .connect(config.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('База данных подключена'))
  .catch(() => console.log('Ошибка подключения к базе данных'));

app.listen(config.PORT, () => {
  console.log(`Сервер работает на ${config.PORT} порту`);
  console.log('NODE_ENV:', process.env.NODE_ENV);
});

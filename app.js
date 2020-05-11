require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  console.log(process.env.NODE_ENV);
});

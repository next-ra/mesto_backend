const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'обязательное поле']
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'обязательное поле']
  },
  avatar: {
    type: String,
    required: [true, 'обязательное поле'],
    validate: {
      validator: link => validator.isURL(link),
      message: 'неверная ссылка на аватар'
    }
  }
});

module.exports = mongoose.model('user', userSchema);

const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'обязательное поле']
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: link => validator.isURL(link),
      message: 'Указана неверная ссылка'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', userSchema);

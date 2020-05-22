const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');
// const { regex } = require('../libs/linkValidation');
const { othersRes } = require('../libs/messages');
const BadRequest = require('../errors/badRequest');

const urlValidate = link => {
  if (!validator.isURL(link)) {
    throw new BadRequest();
  }
  return link;
};
const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .required()
      .custom(urlValidate)
      .message(`avatar: ${othersRes.wrongLink}`),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8)
  })
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8)
  })
});

const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    about: Joi.string()
      .required()
      .min(2)
      .max(30)
  })
});

const updateAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom(urlValidate)
      .message(`avatar: ${othersRes.wrongLink}`)
  })
});

const createCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .required()
      .custom(urlValidate)
      .message(`link: ${othersRes.wrongLink}`)
  })
});
module.exports = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
  updateAvatarValidation,
  createCardValidation
};

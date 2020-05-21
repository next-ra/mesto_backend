const { celebrate, Joi, Segments } = require('celebrate');
const { regex } = require('../libs/linkValidation');
const { othersRes } = require('../libs/messages');
const BadRequest = require('../errors/badRequest');

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
      .regex(regex)
      .error(new BadRequest(`avatar: ${othersRes.wrongLink}`)),
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
      .regex(regex)
      .error(new BadRequest(`avatar: ${othersRes.wrongLink}`))
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
      .regex(regex)
      .error(new BadRequest(`link: ${othersRes.wrongLink}`))
  })
});
module.exports = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
  updateAvatarValidation,
  createCardValidation
};

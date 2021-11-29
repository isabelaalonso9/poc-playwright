const Joi = require('joi');

const userByEmailSchema = Joi.object({
  user: Joi.object({
    id: Joi.string().guid(),
    name: Joi.string(),
    email: Joi.string().email(),
    document: Joi.string(),
  }),
});

module.exports = userByEmailSchema;

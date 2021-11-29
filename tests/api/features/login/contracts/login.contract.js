const Joi = require('joi');

const loginSchema = Joi.object({
  message: Joi.string().empty(),
  result: Joi.object({
    action: Joi.string().empty(),
    id: Joi.string().empty(),
    name: Joi.string().empty(),
    document: Joi.string().empty().length(11),
    email: Joi.string().empty().email(),
    token: Joi.string().empty(),
    cryptoToken: Joi.string().empty(),
    cryptoTokenV2: Joi.string().empty(),
    isAdmin: Joi.boolean().empty(),
    acceptPolicy: Joi.boolean().empty(),
    refreshToken: Joi.string().empty(),
  }),
});

module.exports = loginSchema;

const Joi = require('joi');

const decryptTokenSchema = Joi.object({
  unique_name: Joi.string(),
  jti: Joi.string(),
  given_name: Joi.string(),
  company: Joi.string().empty().length(18),
  sid: Joi.string().guid(),
  email: Joi.string().email(),
  nbf: Joi.number(),
  exp: Joi.number(),
  iat: Joi.number(),
  iss: Joi.string(),
  aud: Joi.string(),
});

module.exports = decryptTokenSchema;

const Joi = require('joi');

const invitationByIdSchema = Joi.object({
  socialNumber: Joi.string(),
  email: Joi.string().email(),
  isExternal: Joi.boolean(),
  expirationDate: Joi.date(),
  createdAt: Joi.date(),
  representative: Joi.object({
    socialNumber: Joi.string().allow(''),
    name: Joi.string().allow(''),
    email: Joi.string().allow(''),
    relationship: Joi.number(),
    full: Joi.boolean(),
  }),
  id: Joi.string().guid(),
  isRepresentativeFilling: Joi.boolean(),
  madeByRepresentative: Joi.boolean(),
});

module.exports = invitationByIdSchema;

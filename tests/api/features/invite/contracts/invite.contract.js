const Joi = require('joi');

const inviteSchema = Joi.object({
  invitation: Joi.object({
    socialNumber: Joi.string(),
    email: Joi.string(),
    isExternal: Joi.boolean(),
    hash: Joi.string(),
    expirationDate: Joi.date(),
    createdAt: Joi.date(),
    representative: Joi.object({
      socialNumber: Joi.string().allow(''),
      name: Joi.string().allow(''),
      email: Joi.string().allow(''),
      relationship: Joi.number(),
      full: Joi.boolean(),
    }),
    isRepresentativeFilling: Joi.boolean(),
    madeByRepresentative: Joi.boolean(),
    id: Joi.string(),
  }),
  agentId: Joi.string(),
  hasAlreadyExists: Joi.boolean(),
});

module.exports = inviteSchema;

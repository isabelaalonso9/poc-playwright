const Joi = require('joi');

const userByDocumentSchema = Joi.object({
  user: Joi.object({
    id: Joi.string().guid(),
    name: Joi.string(),
    document: Joi.string(),
    email: Joi.string().email(),
    company: Joi.string().length(18),
    activeUser: Joi.boolean(),
    createDate: Joi.date(),
    updateDate: Joi.date(),
    lastLogin: Joi.date(),
    updatePassword: Joi.boolean(),
    isAdmin: Joi.boolean(),
    failedLoginTries: Joi.number(),
    productPendence: Joi.boolean(),
    acceptPolicy: Joi.boolean(),
    internalRegister: Joi.boolean(),
  }),
});

module.exports = userByDocumentSchema;

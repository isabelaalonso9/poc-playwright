const Joi = require('joi');

const lastInvitationsSchema = Joi.object({
  records: Joi.array().items(Joi.object()),
  count: Joi.number(),
});

module.exports = lastInvitationsSchema;

const Joi = require('joi');

const saveFileSchema = Joi.object({
  documentUrl: Joi.string().uri({
    scheme: ['https', 'vortxsp01'],
  }),
  documentName: Joi.string().regex(/png|jpeg|docs|docx|pdf/),
  documentType: Joi.string().allow(''),
  documentIsDeleted: Joi.boolean(),
});

module.exports = saveFileSchema;

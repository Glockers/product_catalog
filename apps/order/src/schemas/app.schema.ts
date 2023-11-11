import * as Joi from 'joi';

export const configValidationSchemaApp = Joi.object({
  APP_PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('dev', 'prod').required()
});

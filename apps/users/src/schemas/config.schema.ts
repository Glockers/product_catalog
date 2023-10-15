import * as Joi from 'joi';

export const configValidationSchemaApp = Joi.object({
  APP_PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('dev', 'prod').required()
});

export const configValidationSchemaDatabase = Joi.object({
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required()
});

export const configValidationSchemaJWT = Joi.object({
  SECRET_JWT_ACCESS: Joi.string().required(),
  SECRET_JWT_REFRESH: Joi.string().required()
});

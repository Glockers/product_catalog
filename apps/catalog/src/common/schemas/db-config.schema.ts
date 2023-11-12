import * as Joi from 'joi';

export const configValidationPgSchema = Joi.object({
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required()
});

export const configValidationMongoSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  MONGO_LOG: Joi.string().required()
});

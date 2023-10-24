import * as Joi from 'joi';
import { configValidationSchemaApp } from './app-config.schema';
import {
  configValidationMongoSchema,
  configValidationPgSchema
} from './db-config.schema';

export const ConfigValidationSchemas = Joi.object()
  .concat(configValidationSchemaApp)
  .concat(configValidationPgSchema)
  .concat(configValidationMongoSchema);

import * as Joi from 'joi';
import {
  configValidationSchemaApp,
  configValidationSchemaDatabase,
  configValidationSchemaJWT
} from './config.schema';

export const ConfigValidationSchemas = Joi.object()
  .concat(configValidationSchemaDatabase)
  .concat(configValidationSchemaJWT)
  .concat(configValidationSchemaApp);

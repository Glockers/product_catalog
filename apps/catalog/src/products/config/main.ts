import * as Joi from 'joi';
import {
  configValidationSchemaApp,
  configValidationSchemaDatabase
} from './config.schema';

export const ConfigValidationSchemas = Joi.object()
  .concat(configValidationSchemaApp)
  .concat(configValidationSchemaDatabase);

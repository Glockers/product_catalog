import * as Joi from 'joi';
import {
  configValidationSchemaApp,
  configValidationSchemaGraphs
} from './config.schema';

export const ConfigValidationSchemas = Joi.object()
  .concat(configValidationSchemaApp)
  .concat(configValidationSchemaGraphs);

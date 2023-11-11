import * as Joi from 'joi';
import { configValidationSchemaApp } from './app.schema';
import { configValidationSchemaDatabase } from './database.schema';
import { configValidationSchemaRabbitmq } from './rabbit.schema';
import { configValidationSchemaStripe } from './stripe.schema';

export const ConfigValidationSchemas = Joi.object()
  .concat(configValidationSchemaApp)
  .concat(configValidationSchemaDatabase)
  .concat(configValidationSchemaRabbitmq)
  .concat(configValidationSchemaStripe);

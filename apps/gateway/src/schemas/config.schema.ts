import * as Joi from 'joi';

export const configValidationSchemaApp = Joi.object({
  APP_PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('dev', 'prod').required()
});

export const configValidationSchemaGraphs = Joi.object({
  GRAPHQL_CATALOG_URL: Joi.string().required(),
  GRAPHQL_USER_URL: Joi.string().required(),
  GRAPHQL_ORDER_URL: Joi.string().required(),
  GRAPHQL_BASKET_URL: Joi.string().required()
});

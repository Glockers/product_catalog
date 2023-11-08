import * as Joi from 'joi';

export const configValidationSchemaRabbitmq = Joi.object({
  RABBIT_MQ_URI: Joi.string().required(),
  RABBIT_MQ_ORDER_QUEUE: Joi.string().required(),
  RABBIT_MQ_BASKET_QUEUE: Joi.string().required(),
  RABBIT_MQ_CATALOG_QUEUE: Joi.string().required(),
  RABBIT_MQ_USER_QUEUE: Joi.string().required()
});

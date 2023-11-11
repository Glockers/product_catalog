import * as Joi from 'joi';

export const configValidationSchemaStripe = Joi.object({
  STRIPE_DEVICE_NAME: Joi.string().required(),
  STRIPE_SUCCESS_URL: Joi.string().required(),
  STRIPE_CANCEL_URL: Joi.string().required(),
  STRIPE_API_KEY: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required
});

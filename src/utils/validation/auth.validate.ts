import { Joi } from 'celebrate';

export const authSchema = {
  Register: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().trim()
    }
  },
  Login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().trim()
    }
  }
};

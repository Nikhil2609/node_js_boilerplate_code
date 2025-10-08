import { Joi } from 'celebrate';

export const todoSchema = {
  Create: {
    body: {
      title: Joi.string().max(50).required(),
      description: Joi.string().required(),
      completed: Joi.boolean()
    }
  },
  Update: {
    params: {
      id: Joi.number().integer().required()
    },
    body: {
      title: Joi.string().max(50).required(),
      description: Joi.string().required(),
      completed: Joi.boolean()
    }
  },
  Delete: {
    params: {
      id: Joi.number().integer().required()
    }
  },
  GetById: {
    params: {
      id: Joi.number().integer().required()
    }
  },
  List: {
    query: {
      page: Joi.number().integer().min(1).required()
    }
  }
};

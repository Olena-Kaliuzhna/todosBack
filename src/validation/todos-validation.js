const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaCreateTodo = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(150).optional(),
  completed: Joi.boolean().optional(),
});

const schemaUpdateTodo = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  description: Joi.string().min(5).max(150).optional(),
  completed: Joi.boolean().optional(),
}).min(1);

const statusUpdateSchema = Joi.object({
  completed: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, '')}`,
      data: 'Not Found',
    });
  }
  next();
};
module.exports.validateCreateTodo = (req, res, next) => {
  return validate(schemaCreateTodo, req.body, next);
};
module.exports.validateUpdateTodo = (req, res, next) => {
  return validate(schemaUpdateTodo, req.body, next);
};
module.exports.validateUpdateStatus = (req, res, next) => {
  return validate(statusUpdateSchema, req.body, next);
};

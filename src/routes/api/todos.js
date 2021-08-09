const express = require('express');
const controllerTodos = require('../../controllers/todos-controllers');
const {
  validateCreateTodo,
  validateUpdateTodo,
  validateUpdateStatus,
} = require('../../validation/todos-validation');
const guard = require('../../helpers/guard');
const router = express.Router();

router.get('/', guard, controllerTodos.getAll);

router.get('/:id', guard, controllerTodos.getById);

router.post('/', guard, validateCreateTodo, controllerTodos.create);

router.delete('/:id', guard, controllerTodos.remove);

router.put('/:id', guard, validateUpdateTodo, controllerTodos.update);

router.patch(
  '/:id/completed',
  guard,
  validateUpdateStatus,
  controllerTodos.updateStatus,
);

module.exports = router;

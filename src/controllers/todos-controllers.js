const { HttpCode } = require('../helpers/constants');
const { TodosServices } = require('../services');

const todosServices = new TodosServices();

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs, ...rest } = await todosServices.getAll(userId, req.query);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        todos: [...docs],
        ...rest,
      },
    });
  } catch (e) {
    next(e);
  }
};
const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todo = await todosServices.getById(userId, req.params);
    if (todo) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          todo,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found todo',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};
const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todo = await todosServices.create(userId, req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        todo,
      },
    });
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  console.log('req: ', req);
  if (Object.values(req.body).length === 0) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: 'Missing fields',
      data: 'Missing fields',
    });
  }
  try {
    const userId = req.user.id;
    console.log('userId: ', userId);
    const todo = await todosServices.update(userId, req.params, req.body);
    console.log('todo:CCC ', todo);
    if (todo) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          todo,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found todo',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todo = await todosServices.remove(userId, req.params);
    if (todo) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'todo deleted',
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found todo',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todo = await todosServices.updateStatus(userId, req.params, req.body);
    if (todo) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          todo,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Todo not found',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  updateStatus,
};

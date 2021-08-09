const { HttpCode } = require('../helpers/constants');
const { UsersServices, AuthServices } = require('../services');

const usersServices = new UsersServices();
const authServices = new AuthServices();

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;
  const user = await usersServices.findByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'This email is already use',
    });
  }
  try {
    const newUser = await usersServices.create({
      name,
      email,
      password,
    });
    const isSucces = await authServices.signup(newUser);
    if (!isSucces) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'failure',
        code: HttpCode.UNAUTHORIZED,
        message: 'User Unauthorized',
      });
    }

    if (isSucces.message) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'failure',
        code: HttpCode.BAD_REQUEST,
        message: isSucces.message,
      });
    }
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        token: isSucces.token,
        user: isSucces.user,
      },
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const response = await authServices.login({ email, password });
    if (response) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          ...response,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await authServices.logout(id);
    return res.status(HttpCode.NO_CONTENT).json({
      status: 'success',
      code: HttpCode.NO_CONTENT,
    });
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const user = await authServices.current(userEmail);
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: user });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  login,
  logout,
  current,
};

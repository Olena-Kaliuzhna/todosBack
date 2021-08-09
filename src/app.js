const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const todosRouter = require('./routes/api/todos');
const usersRouter = require('./routes/api/users');

const app = express();
const { HttpCode } = require('./helpers/constants');
const { apliLimit, jsonLimit } = require('./config/rate-limit.json');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(
  '/api/',
  rateLimit({
    windowMs: apliLimit.windowMs,
    max: apliLimit.max,
    handler: (_req, _res, next) => {
      next({
        status: HttpCode.BAD_REQUEST,
        message: 'Too many requests in 15 minutes',
      });
    },
  }),
);

app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: jsonLimit }));

app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);

// app.use((req, res, _next) => {
//   res.status(HttpCode.NOT_FOUND).json({
//     status: 'error',
//     code: HttpCode.NOT_FOUND,
//     message: `Use api on routes ${req.baseUrl}/api/contacts`,
//     data: 'Not Found',
//   });
// });

app.use((err, _req, res, _next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

module.exports = app;

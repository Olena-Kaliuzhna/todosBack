const mongoose = require('mongoose');

require('dotenv').config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected successful.');
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error. Error message: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and app terminated');
    process.exit(1);
  });
});

module.exports = db;

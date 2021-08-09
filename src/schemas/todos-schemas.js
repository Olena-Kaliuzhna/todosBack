const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Set title for todo'],
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  },
});

todoSchema.plugin(mongoosePaginate);

const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;

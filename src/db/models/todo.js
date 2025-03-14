const mongoose = require('mongoose')
const Types = mongoose.Types
const TodoSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    unique: true,
    index: true
  },
  status: {
    type: String,
    default: 'notStarted',
    enum: {
      values: ['notStarted', 'inprogress', 'completed'],
      message: '{VALUE} is not a valid role.'
    },
  }
}, {timestamps: true})

module.exports = mongoose.model('Todo', TodoSchema);
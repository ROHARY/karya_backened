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
    enum: {
      values: ['not_started', 'in_progress', 'completed'],
      message: '{VALUE} is not a valid role.'
    },
  }
}, {timestamps: true})

module.exports = mongoose.model('Todo', TodoSchema);
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
})

userSchema.pre('save', function (next) {
  this.name = `${this.firstName} ${this.lastName}`;
  console.log()
  next();
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    min: [3,''],
    required: [true, 'why no email address']
  },
  about: String,
  dateofbirth: Date
})
module.exports = mongoose.model('userModel', userSchema)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Input a valid Name"]
  },
  email: {
    type: String,
    required: [true, "Input a valid Email"],
    unique: true
  },
  password: {
    type: String,
    // required: [true, "Input a valid Password"],
    // minlength: [6, "Password must be at least 6 characters"]
  },
  confirmPassword: {
    type: String,
    // required: [true, "Input a valid Password"],
    // minlength: [6, "Password must be at least 6 characters"]
  }
},
{
  timestamps: true
})

module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    // trim: true,
    // maxlength: [50, "Name can not be more than 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    // trim: true,
    // maxlength: [20, "Phone can not be more than 20 characters"]
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);
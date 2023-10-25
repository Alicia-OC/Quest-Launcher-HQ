const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  role: [
    {
      type: String,
      required: true,
      default: "",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  creationDate: { type: String, required: true },

  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  title: {
    type: String,
    required: true,
  },

  /** role: {
    type: String,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "User",
  },
   */
  role: {
    type: String,
    required: false,
    default: '65984704c535636095cf7791'
  },

  templates: { type: Array, required: false, default: [""] },
  requests: { type: Array, required: false, default: [""] },
  active: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

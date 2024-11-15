const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
      unique: true,
    },
    domain: {
      type: String,
      required: false,
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
    role: {
      type: String,
      required: false,
      default: "65984704c535636095cf7791",
    },
    organization: { type: String, required: false },

    templates: { type: Array, required: false, default: ["66f0525e47d8bce95a7a932c"] },
    requests: { type: Array, required: false, default: ["6717f238fbc0771345290769"] },
    greetings: { type: Array, required: false, default: ["Random greet"] },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };

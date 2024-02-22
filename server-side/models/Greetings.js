const mongoose = require("mongoose");
const greetingsSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    userId: {
      type: String,
      required: false,
    },
  },

  { timestamps: true }
);

const Greetings = mongoose.model("Greetings", greetingsSchema);

module.exports = { Greetings };

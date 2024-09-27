const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    language: { type: String, required: true, minlength: 2 },
    languageCode: {
      type: String,
      required: true,
      minlength: 2,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Language = mongoose.model("Language", languageSchema);

module.exports = { Language };

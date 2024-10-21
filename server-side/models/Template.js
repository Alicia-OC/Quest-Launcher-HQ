const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: false,
    },
    favorite: { type: Boolean, required: false, default: false },
    title: { type: String, required: true },
    developer: { type: String, required: true },
    game: { type: String, required: true },
    introText: { type: String, required: true },
    instructions: { type: String, required: false },
    mqproject: { type: String, required: true },
    languageTeam: { type: Array, required: true },
    attachments: { type: Array, required: true },
    requirements: { type: Array, required: true },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = { Template };

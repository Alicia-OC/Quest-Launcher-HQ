const mongoose = require("mongoose");

const handoffSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  greeting: { type: String, required: true },
  introText: { type: String, required: true },
  instructions: { type: String, required: false },
  game: { type: String, required: true },
  mqproject: { type: String, required: true },
  wordcount: { type: String, required: true },
  files: { type: String, required: true },
  service: { type: String, required: true },
  languageTeam: { type: Array, required: true },
  attachments: { type: Array, required: true },
  requirements: { type: Array, required: true },
  deadlines: {
    translation: { type: String, required: false },
    proofreading: { type: String, required: false },
  },
});

const Handoff = mongoose.model("Handoff", handoffSchema);
module.exports = { Handoff };

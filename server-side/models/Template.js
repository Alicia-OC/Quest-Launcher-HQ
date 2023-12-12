const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  favorite: {type: Boolean, required: true, default: false},
  templateTitle: { type: String, required: true },
  developer: { type: String, required: true },
  game: { type: String, required: true },
  introText: { type: String, required: true },
  instructions: { type: String, required: false },
  languageTeam: { type: Array, required: true },
  attachments: { type: Array, required: true },
  requirements: { type: Array, required: true },
});

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  games: { type: Array, required: true },
  timezone: { type: String, required: false },
});

const gamesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  languages: { type: Array, required: true },
  developer: { type: String, required: true },
});

const languageSchema = new mongoose.Schema({
  language: { type: String, required: true },
  languageCode: { type: String, required: true },
});

const gameTeamSchema = new mongoose.Schema({
  languages: { type: Array, required: true },
  game: { type: String, required: true },
});

const Language = mongoose.model("Language", languageSchema);
const Games = mongoose.model("Games", gamesSchema);
const Developer = mongoose.model("Client", developerSchema);
const Template = mongoose.model("Template", templateSchema);

module.exports = { Games, Developer, Template, Language };

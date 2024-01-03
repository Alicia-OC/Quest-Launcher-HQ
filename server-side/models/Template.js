const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  creationDate: { type: String, required: true },
  userId: {
    type: String,
    required: false,
  },
  favorite: { type: Boolean, required: false, default: false },
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
  creationDate: { type: String, required: true },
  name: { type: String, required: true },
  games: { type: Array, required: true },
  timezone: { type: String, required: false },
});

const gamesSchema = new mongoose.Schema({
  creationDate: { type: String, required: true },
  title: { type: String, required: true },
  languages: { type: Array, required: true },
  developer: { type: String, required: true },
  links: { type: Array, required: false },
});

const languageSchema = new mongoose.Schema({
  creationDate: { type: String, required: true },

  language: { type: String, required: true },
  languageCode: { type: String, required: true },
});


const Language = mongoose.model("Language", languageSchema);
const Games = mongoose.model("Games", gamesSchema);
const Developer = mongoose.model("Client", developerSchema);
const Template = mongoose.model("Template", templateSchema);

module.exports = { Games, Developer, Template, Language };

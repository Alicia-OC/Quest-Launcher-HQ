const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const GamesSchema = require("../models/Template");
const Games = GamesSchema.Games;

const getAllGames = asyncHandler(async (req, res) => {
  try {
    Games.find({}).then((data) => {
      const formattedGames = data.map(({ _id, title, developer, languages, links }) => {
        return { _id, title, developer, languages, links };
      });
      if (!formattedGames.length) {
        res.status(200).json("No Items found");
      } else {
        res.status(200).json(formattedGames);
        return formattedGames;
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const createnewGame = asyncHandler(async (req, res) => {
  const { title, developer, languages, links } = req.body;
  if (!title || !developer || !languages || !links ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const GameDuplicate = await Games.findOne({ title }).lean().exec();

  if (GameDuplicate) {
    res.status(409).json({ message: "Game already in database" });
  }
  const gameObject = {
    title: title,
    developer: developer,
    languages: languages,
    links: links,
  };

  const newGame = await Games.create(gameObject);

  if (newGame) {
    console.log(newGame);
    res.status(201).json({
      message: `New Game ${title} has been created`,
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = {
  getAllGames,
  createnewGame,
};

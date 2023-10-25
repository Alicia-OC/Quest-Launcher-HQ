const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const DeveloperSchema = require("../models/Template");
const Developer = DeveloperSchema.Developer;

const getAllDevelopers = asyncHandler(async (req, res) => {
  try {
    Developer.find({}).then((data) => {
      const formattedDeveloper = data.map(({ _id, name, games, timezone }) => {
        return { _id, name, games, timezone };
      });
      if (!formattedDeveloper.length) {
        res.status(200).json("No Items found");
      } else {
        res.status(200).json(formattedDeveloper);
        return formattedDeveloper;
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const createnewDeveloper = asyncHandler(async (req, res) => {
  const { name, games, timezone } = req.body;
  if (!name || !games || !timezone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const developerDuplicate = await Developer.findOne({ name }).lean().exec();

  if (developerDuplicate) {
    res.status(409).json({ message: "Language already in database" });
  } 
  const developerObject = {
    name: name,
    games: games,
    timezone:timezone
  };

  const newDeveloper = await Developer.create(developerObject);

  if (newDeveloper) {
    res.status(201).json({
      message: `New developer: ${name} has been created`,
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = {
  getAllDevelopers,
  createnewDeveloper,
};

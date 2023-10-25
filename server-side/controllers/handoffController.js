const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const HandoffSchema = require("../models/Handoff");
let Handoff = HandoffSchema.Handoff;

const getAllHandoff = asyncHandler(async (req, res) => {
  try {
    Handoff.find({}).then((data) => {
      const formattedHandoff = data.map(
        ({
          _id,
          projectTitle,
          greeting,
          introText,
          instructions,
          game,
          mqproject,
          wordcount,
          files,
          service,
          languageTeam,
          attachments,
          requirements,
          deadlines,
        }) => {
          return {
            _id,
            projectTitle,
            greeting,
            introText,
            instructions,
            game,
            mqproject,
            wordcount,
            files,
            service,
            languageTeam,
            attachments,
            requirements,
            deadlines,
          };
        }
      );
      res.status(200).json(formattedHandoff);
      console.log(formattedHandoff);
      return formattedHandoff;
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const createNewHandoff = asyncHandler(async (req, res) => {
  const {
    projectTitle,
    greeting,
    introText,
    instructions,
    game,
    mqproject,
    wordcount,
    files,
    service,
    languageTeam,
    attachments,
    requirements,
    deadlines,
  } = req.body;
  console.log(
    projectTitle,
    greeting,
    introText,
    instructions,
    game,
    mqproject,
    wordcount,
    files,
    service,
    languageTeam,
    attachments,
    requirements,
    deadlines
  );
  if (
    !projectTitle ||
    !greeting ||
    !introText ||
    !game ||
    !mqproject ||
    !wordcount ||
    !files ||
    !service ||
    !languageTeam ||
    !attachments ||
    !requirements ||
    !deadlines
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for nickname duplicate
  const duplicate = await Handoff.findOne({ projectTitle }).lean().exec();
  //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects
  //exec() function is used to execute the query. It can handle promises and executes the query easily.
  if (duplicate) {
    return res.status(409).json({
      message: "Duplicate project title, please choose a different one",
    });
  }
  const handoffObject = {
    projectTitle: projectTitle,
    greeting: greeting,
    introText: introText,
    instructions: instructions,
    game: game,
    mqproject: mqproject,
    wordcount: wordcount,
    files: files,
    service: service,
    languageTeam: languageTeam,
    attachments: attachments,
    requirements: requirements,
    deadlines: deadlines,
  };
  const newHandoff = await Handoff.create(handoffObject);

  if (newHandoff) {
    console.log("handoff created");
    res.status(201).json({
      message: `New handoff titled ${projectTitle} has been created. You will receive a mail with the handoff to be sent!`,
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = {
  getAllHandoff,
  createNewHandoff,
};

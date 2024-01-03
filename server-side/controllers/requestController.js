const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const RequestSchema = require("../models/Request");
let Request = RequestSchema.Request;

const getAllRequest = asyncHandler(async (req, res) => {
  try {
    Request.find({}).then((data) => {
      const formattedRequest = data.map(
        ({
          _id,
          creationDate,
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
            creationDate,
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
      res.status(200).json(formattedRequest);
      console.log(formattedRequest);
      return formattedRequest;
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const createNewRequest = asyncHandler(async (req, res) => {
  const {
    creationDate,
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
  console.log(creationDate,
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
    !creationDate ||
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
  const duplicate = await Request.findOne({ projectTitle }).lean().exec();
  //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects
  //exec() function is used to execute the query. It can handle promises and executes the query easily.
  if (duplicate) {
    return res.status(409).json({
      message: "Duplicate project title, please choose a different one",
    });
  }
  const requestObject = {
    creationDate: creationDate,
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
  const newRequest = await Request.create(requestObject);

  if (newRequest) {
    console.log("Request created");
    res.status(201).json({
      message: `New Request titled ${projectTitle} has been created. You will receive a mail with the Request to be sent!`,
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = {
  getAllRequest,
  createNewRequest,
};

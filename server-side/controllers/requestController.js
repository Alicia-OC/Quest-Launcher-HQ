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
      res.status(200).json(formattedRequest);
      console.log(formattedRequest);
      return formattedRequest;
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const getUserRequests = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await Request.find({ userId });
    res.status(200).json(requests);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

const createNewRequest = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
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

    const duplicate = await Request.findOne({ projectTitle }).lean().exec();

    if (duplicate) {
      return res.status(409).json({
        message: "Duplicate project title, please choose a different one",
      });
    } else {
      const requestObject = {
        userId: userId,
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
      console.log(newRequest);

      res.status(200).send(newRequest._id);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllRequest,
  createNewRequest,
  getUserRequests,
};

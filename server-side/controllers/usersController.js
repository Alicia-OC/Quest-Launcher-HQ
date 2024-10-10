const UserSchema = require("../models/Users");
const asyncHandler = require("express-async-handler");
let User = UserSchema.User;
const { Template } = require("../models/Template.js");
const { Request } = require("../models/Request.js");

const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
    User.find({}).then((data) => {
      const formattedUser = data.map(
        ({
          _id,
          fullName,
          email,
          role,
          active,
          requests,
          templates,
          title,
        }) => {
          return {
            _id,
            active,
            role,
            title,
            fullName,
            email,
            templates,
            requests,
          };
        }
      );
      res.status(200).json(formattedUser);
      return formattedUser;
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const getUserTemplate = async (req, res) => {
  try {
    const { userId, templateId } = req.params;
    const user = await User.findById(userId);
    const template = await Template.findById(templateId);

    if (user.templates.includes(templateId)) {
      res.status(200).json(template);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserRequest = async (req, res) => {
  try {
    const { userId, requestId } = req.params;
    const user = await User.findById(userId);
    const request = await Request.findById(requestId);

    if (user.requests.includes(requestId)) {
      res.status(200).json(request);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUserTemplates = async (req, res) => {
  console.log('dsads');
  try {
    const { userId  } = req.params;

    const user = await User.findById(userId );

    const templates = await Promise.all(
      user.templates.map((id) => Template.findById(id))
    );

    const formattedTemplates = templates.map(
      ({
        _id,
        title,
        game,
        developer,
        instructions,
        introText,
        attachments,
        requirements,
        favorite,
      }) => {
        return {
          _id,
          title,
          game,
          developer,
          instructions,
          introText,
          attachments,
          requirements,
          favorite,
        };
      }
    );
    res.status(200).json(formattedTemplates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUserRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const requests = await Promise.all(
      user.requests.map((id) => Request.findById(id))
    );
    const formattedRequests = requests.map(
      ({
        _id,
        title,
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
          title,
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
    res.status(200).json(formattedRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { userId, reqId, templateId } = req.body;
    const user = await User.findById(userId);
    console.log(user);

    if (reqId) {
      if (user.requests.includes(reqId)) {
        user.requests = user.requests.filter((id) => id !== reqId);
      } else {
        user.requests.push(reqId);
      }
    }

    if (templateId) {
      if (user.templates.includes(templateId)) {
        user.templates = user.templates.filter((id) => id !== templateId);
      } else {
        user.templates.push(reqId)
      }
    }
    await user.save();
    res.json({ message: `${user.email} requests updated` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {});

const allAccess = (req, res) => {
  console.log("public");
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  console.log("user");

  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  console.log("admin");
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
  console.log("moderator");
  res.status(200).send("Moderator Content.");
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  getUserTemplate,
  getUserRequest,
  getAllUserTemplates,
  getAllUserRequests,
};

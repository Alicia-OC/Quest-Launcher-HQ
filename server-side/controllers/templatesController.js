const TemplateSchemas = require("../models/Template");
const UserSchema = require("../models/Users");

const asyncHandler = require("express-async-handler");
const Template = TemplateSchemas.Template;
const User = UserSchema.User;

const getUserTemplates = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const template = await Template.find({ userId });
    res.status(200).json(template);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

const getUserFavTemplates = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const template = await Template.find({ userId });

    const favtemplates = template.filter((item) => {
      return item.favorite;
    });
    res.status(200).json(favtemplates);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

const getAllTemplates = asyncHandler(async (req, res) => {
  try {
    Template.find({}).then((data) => {
      if (data.length === 0) {
        res.json({
          message:
            "Looks like you haven't created any template yet, what are you waiting for? :D",
        });
      } else {
        res.send(data);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getOneTemplate = asyncHandler(async (req, res) => {
  console.log("fsdf");
  try {
    const { userId, templateId } = req.query;
    console.log(userId, templateId);
    const template = await Template.findById(templateId);
    console.log(template);
    if (userId === template.userId) {
      console.log(template);
      res.status(200).json(template);
      console.log("fsdf");

    }
  } catch (err) {
    res
      .status(500)
      .json({
        message: `Sorry, it looks like this template doesn't belong to you!`,
      });
  }
});

const createTemplate = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
      domain,
      title,
      game,
      developer,
      instructions,
      mqproject,
      languageTeam,
      introText,
      attachments,
      requirements,
      favorite,
    } = req.body;
    const user = await User.findById(userId);

    const duplicate = await Template.findOne({ title }).lean().exec();

    if (duplicate) {
      return res.status(409).json({
        message: "Duplicate project title, please choose a different one",
      });
    } else {
      const templateObject = {
        userId: userId,
        domain: domain,
        title: title,
        game: game,
        developer: developer,
        introText: introText,
        instructions: instructions,
        mqproject: mqproject,
        languageTeam: languageTeam,
        attachments: attachments,
        requirements: requirements,
        favorite: favorite,
      };
      const newTemplate = await Template.create(templateObject);
      console.log("Template created!");
      console.log(newTemplate._id);
      res.status(200).send(newTemplate._id);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deleteTemplate = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const template = await Template.findById(id).exec();
    const result = await template.deleteOne();

    res
      .status(200)
      .json({ msg: `Template ${result.title} has succesfully been deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const updateTemplate = asyncHandler(async (req, res) => {
  try {
    const { id, title, introText, mqproject, game, instructions, favorite } = req.body;

    const template = await Template.findById(id).exec();

    if (!template) {
      return res.status(400).json({ message: "No template found" });
    }

    const duplicate = await Template.findOne({ title, id });

    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate title" });
    }

    if (title) {
      template.title = title;
    }

    if (game) {
      template.game = game;
    }
    if (introText) {
      template.introText = introText;
    }
    if (instructions) {
      template.instructions = instructions;
    }
    if (favorite) {
      template.favorite = favorite;
    }
    if(mqproject){
      template.mqproject = mqproject
    }

    const updatedTemplate = await template.save();

    res.json({ message: `${updatedTemplate.title} updated` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const starTemplate = asyncHandler(async (req, res) => {
  try {
    const { id, favorite } = req.body;
    const template = await Template.findById(id).exec();
    template.favorite = favorite;

    const updatedTemplate = await template.save();

    res.json({
      message: `${updatedTemplate.title} with id: ${updatedTemplate._id} updated`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate,
  starTemplate,
  getUserTemplates,
  getUserFavTemplates,
  getOneTemplate,
};

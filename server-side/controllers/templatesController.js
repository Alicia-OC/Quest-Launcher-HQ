const TemplateSchemas = require("../models/Template");
const UserSchema = require("../models/Users");

const asyncHandler = require("express-async-handler");
const Template = TemplateSchemas.Template;
const User = UserSchema.User;

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

const createTemplate = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
      templateTitle,
      game,
      developer,
      instructions,
      languageTeam,
      introText,
      attachments,
      requirements,
      favorite,
    } = req.body;
    const user = await User.findById(userId);

    const duplicate = await Template.findOne({ templateTitle }).lean().exec();

    if (duplicate) {
      return res.status(409).json({
        message: "Duplicate project title, please choose a different one",
      });
    } else {
      const templateObject = {
        userId: userId,
        templateTitle: templateTitle,
        game: game,
        developer: developer,
        introText: introText,
        instructions: instructions,
        languageTeam: languageTeam,
        attachments: attachments,
        requirements: requirements,
        favorite: favorite,
      };
      const newTemplate = await Template.create(templateObject);
      console.log("Template created!");
      res.status(201).json({
        message: `New template titled ${templateTitle} has been created.`,
      });
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
    const { id, templateTitle, introText, game, instructions, favorite } =
      req.body;

    const template = await Template.findById(id).exec();

    if (!template) {
      return res.status(400).json({ message: "No template found" });
    }

    const duplicate = await Template.findOne({ title, id });

    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate title" });
    }

    if (templateTitle) {
      template.templateTitle = templateTitle;
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

    const updatedTemplate = await template.save();

    res.json({ message: `${updatedTemplate.templateTitle} updated` });
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

    res.json({ message: `${updatedTemplate.templateTitle} updated` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate,
  starTemplate
};

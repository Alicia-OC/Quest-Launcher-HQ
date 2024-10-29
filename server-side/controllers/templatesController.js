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
  try {
    const { userId, templateId } = req.params;
    const template = await Template.findById(templateId);

    if (userId === template.userId) {
      res.status(200).json(template);
    }
  } catch (err) {
    res.status(500).json({
      message: `Sorry, something went wrong. You might have introduced the wrong ID`,
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
  console.log("contact");
  try {
    const {
      id,
      userId,
      title,
      introText,
      mqproject,
      game,
      instructions,
      favorite,
    } = req.body;

    const user = await User.findById(userId);
    if (!user || !user.templates.includes(id)) {
      return res.status(400).json({ message: "User or template not found" });
    }

    // Create an object to hold the fields to be updated
    const fieldsToUpdate = {};

    if (title !== undefined) fieldsToUpdate.title = title;
    if (introText !== undefined) fieldsToUpdate.introText = introText;
    if (mqproject !== undefined) fieldsToUpdate.mqproject = mqproject;
    if (game !== undefined) fieldsToUpdate.game = game;
    if (instructions !== undefined) fieldsToUpdate.instructions = instructions;
    if (favorite !== undefined) fieldsToUpdate.favorite = favorite;

    // Update the template with the filtered fields
    const updatedTemplate = await Template.findByIdAndUpdate(
      id,
      fieldsToUpdate,
      { new: true }
    );

    if (!updatedTemplate) {
      return res.status(400).json({ message: "Template not found" });
    }

    res.json({ message: `${updatedTemplate.title} updated`, updatedTemplate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const starTemplate = asyncHandler(async (req, res) => {
  try {
    const { userId, id, favorite } = req.body;
    const template = await Template.findById(id).exec();
    const user = await User.findById(userId);
    console.log(userId);
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

const TemplateSchemas = require("../models/Template");
const asyncHandler = require("express-async-handler");

const Template = TemplateSchemas.Template;

const getAllTemplates = asyncHandler(async (req, res) => {
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
  console.log(Template);
});

const createTemplate = asyncHandler(async (req, res) => {
  const {
    templateTitle,
    game,
    developer,
    instructions,
    languageTeam,
    introText,
    attachments,
    requirements,
  } = req.body;

  console.log(
    {
    templateTitle: templateTitle,
    game: game,
    developer: developer,
    introText: introText,
    instructions: instructions,
    languageTeam: languageTeam,
    attachments: attachments,
    requirements: requirements,
  }
  );
  if (
    !templateTitle ||
    !introText ||
    !developer ||
    !game ||
    !languageTeam ||
    !attachments ||
    !requirements
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for templateTitle duplicate
  const duplicate = await Template.findOne({ templateTitle }).lean().exec();
  //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects
  //exec() function is used to execute the query. It can handle promises and executes the query easily.
  if (duplicate) {
    return res.status(409).json({
      message: "Duplicate project title, please choose a different one",
    });
  }
  const templateObject = {
    templateTitle: templateTitle,
    game: game,
    developer: developer,
    introText: introText,
    instructions: instructions,
    languageTeam: languageTeam,
    attachments: attachments,
    requirements: requirements,
  };
  const newTemplate = await Template.create(templateObject);

  if (newTemplate) {
    console.log("Template created!");
    res.status(201).json({
      message: `New template titled ${templateTitle} has been created.`,
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

const deleteTemplate = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: " ID Required" });
  }

  const template = await Template.findById(id).exec();

  if (!template) {
    res
      .status(400)
      .json({ message: "The Template you're looking for doesn't exist" });
  }

  const result = await template.deleteOne();
  const reply = `Template ${result.title} has succesfully been deleted`;

  res.json(reply);
});

const updateTemplate = asyncHandler(async (req, res) => {
  const { id, templateTitle, introText, developer, game, instructions } = req.body;

  const template = await Template.findById(id).exec();

  if (!template) {
    return res.status(400).json({ message: "No template found" });
  }

  const duplicate = await Template.findOne({ title, id });

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate title" });
  }
  template.title = templateTitle;
  template.developer = developer;
  template.game = game;
  introText.introText = introText
  template.instructions = instructions;

  const updatedTemplate = await template.save();

  res.json({ message: `${updatedTemplate.title} updated` });
});

module.exports = {
  getAllTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate,
};

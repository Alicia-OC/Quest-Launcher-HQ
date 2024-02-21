const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const LanguagesSchema = require("../models/Languages");
const Language = LanguagesSchema.Language;

const getAllLanguages = asyncHandler(async (req, res) => {
  try {
    Language.find({}).then((data) => {
      const formattedLanguage = data.map(({ _id, language, languageCode }) => {
        return { _id, language, languageCode };
      });
      if (!formattedLanguage.length) {
        res.status(200).json("No Items found");
      } else {
        res.status(200).json(formattedLanguage);
        return formattedLanguage;
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const createNewLanguage = asyncHandler(async (req, res) => {
  try {
    const { language, languageCode } = req.body;
    const languageDuplicate = await Language.findOne({ language })
      .lean()
      .exec();
    const codeDuplicate = await Language.findOne({ languageCode })
      .lean()
      .exec();

    if (languageDuplicate) {
      res.status(409).json({ message: "Language already in database" });
    } else if (codeDuplicate) {
      res.status(409).json({ message: "Code language already in database" });
    }

    const languageObject = {
      language: language,
      languageCode: languageCode,
    };

    const newLanguage = await Language.create(languageObject);

    if (newLanguage) {
      res.status(201).json({
        message: `New language: ${language} with code ${languageCode} has been created`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllLanguages,
  createNewLanguage,
};

const VendorSchemas = require("../models/Vendors");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
let Vendor = VendorSchemas.Vendor;

const getAllVendors = asyncHandler(async (req, res) => {
  try {
    Vendor.find({})
      .sort({ nickname: 1 })
      .then((data) => {
        const formattedVendor = data.map(
          ({ _id, fullName, nickname, language, service, email }) => {
            return { _id, fullName, nickname, language, service, email };
          }
        );
        res.status(200).json(formattedVendor);
        return formattedVendor;
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getLanguageBasedVendors = asyncHandler(async (req, res) => {
  console.log("fsdf");
  try {
    const { language } = req.query;
    const langUppercase = language.charAt(0).toUpperCase() + language.slice(1);

    Vendor.find({ language: langUppercase })
      .sort({ nickname: 1 })
      .then((data) => {
        const formattedVendor = data.map(
          ({ _id, fullName, nickname, language, service, email }) => {
            return { _id, fullName, nickname, language, service, email };
          }
        );
        res.status(200).json(formattedVendor);
        return formattedVendor;
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const createNewVendor = asyncHandler(async (req, res) => {
  try {
    const { fullName, nickname, language, service, email, userId } = req.body;
    const duplicate = await Vendor.findOne({ fullName }).lean().exec();
    if (duplicate) {
      return res
        .status(409)
        .json({
          message:
            "A vendor with this name has already been added in the database",
        });
    }
    const vendorObject = {
      createdBy: userId,
      language: language,
      fullName: fullName,
      nickname: nickname,
      service: service,
      email: email,
    };
    const newVendor = await Vendor.create(vendorObject);

    if (newVendor) {
      let serviceProvided;
      if (service.translation && service.proofreading == true) {
        serviceProvided = "TEP";
      } else {
        serviceProvided = "TRA";
      }
      console.log(newVendor);

      res.status(201).json({
        message: `New vendor ${nickname} created. The targate language is ${language}, and the service provided is ${serviceProvided}`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const updateVendor = asyncHandler(async (req, res) => {
  try {
    const { id, fullName, nickname, language, service, active } = req.body;

    //check for duplicate
    const duplicate = await Vendor.findOne({ nickname }).lean().exec();

    const updateDocument = {
      $set: {
        nickname: nickname,
        service: { translation: translation, proofreading: proofreading },
        active: active,
      },
    };
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deleteVendor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const vendor = await Vendor.findById(id).exec();

    if (!vendor) {
      return res.status(400).json({ message: "User not found" });
    }
    const result = await vendor.deleteOne();
    const reply = `Vendor ${result.nickname} with ID ${result._id} deleted`;
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllVendors,
  createNewVendor,
  updateVendor,
  deleteVendor,
  getLanguageBasedVendors,
};

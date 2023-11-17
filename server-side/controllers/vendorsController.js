const VendorSchemas = require("../models/Vendors");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
let Vendor = VendorSchemas.Vendor;

const getAllVendors = asyncHandler(async (req, res) => {
  try {
    Vendor.find({}).then((data) => {
      const formattedVendor = data.map(
        ({ _id, fullName, nickname, language, service, email }) => {
          return { _id, fullName, nickname, language, service, email };
        }
      );
      res.status(200).json(formattedVendor);
      return formattedVendor;
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const createNewVendor = asyncHandler(async (req, res) => {
  const { fullName, nickname, language, service, email } = req.body;
  if ((!fullName, !nickname || !language || !service || !email)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for nickname duplicate
  const duplicate = await Vendor.findOne({ nickname }).lean().exec();
  //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects
  //exec() function is used to execute the query. It can handle promises and executes the query easily.
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate nickname" });
  }
  const vendorObject = {
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
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

const updateVendor = asyncHandler(async (req, res) => {
  const { id, fullName, nickname, language, service, active } = req.body;

  if (!id || !fullName || !nickname || !language || !service) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check for duplicate
  const duplicate = await Vendor.findOne({ nickname }).lean().exec();

  const updateDocument = {
    $set: {
      nickname: nickname,
      service: { translation: translation, proofreading: proofreading },
      active: active,
    },
  };
});

const deleteVendor = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }
  const vendor = await Vendor.findById(id).exec();

  if (!vendor) {
    return res.status(400).json({ message: "User not found" });
  }
  const result = await vendor.deleteOne();
  const reply = `Vendor ${result.nickname} with ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllVendors,
  createNewVendor,
  updateVendor,
  deleteVendor,
};

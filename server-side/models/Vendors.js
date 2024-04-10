const mongoose = require("mongoose");

const vendorSchemaPlus = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    language: { type: String, required: true },
    fullName: { type: String, required: true },
    nickname: { type: String, required: true },
    service: {
      translation: { type: Boolean, default: true },
      proofreading: { type: Boolean, default: false },
    },
    email: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const Vendor = mongoose.model("Vendor", vendorSchemaPlus);

const vendorListSchema = {
  language: String,
  linguists: [vendorSchemaPlus],
};

const List = mongoose.model("List", vendorListSchema);

const vendor1 = new Vendor({
  fullName: "Jane Austen",
  nickname: "Janu",
  language: "FR",
  service: { translation: true, proofreading: true },
});

const vendor2 = new Vendor({
  fullName: "Oscar Wilde",
  nickname: "Oscar",
  language: "FR",
  service: { translation: true, proofreading: false },
});

const defaultVendors = [vendor1, vendor2];

module.exports = { Vendor };

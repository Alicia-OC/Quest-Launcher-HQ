const mongoose = require("mongoose");
const developerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    games: { type: Array, required: true },
    timezone: { type: String, required: false },
  },
  { timestamps: true }
);

const Developer = mongoose.model("Client", developerSchema);

module.exports = {Developer};

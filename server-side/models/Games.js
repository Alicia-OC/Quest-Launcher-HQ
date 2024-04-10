const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema(
    {
      createdBy: {
        type: String,
        required: false,
      },
      title: { type: String, required: true },
      languages: { type: Array, required: true },
      developer: { type: String, required: true },
      links: { type: Array, required: false },
    },
    { timestamps: true }
  );
  

const Games = mongoose.model("Games", gamesSchema);

module.exports = {Games};

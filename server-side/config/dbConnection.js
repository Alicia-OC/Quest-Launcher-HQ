const mongoose = require("mongoose");
require("dotenv").config();
process.env.DATABASE_MONGODB_URI;

const dbname = "HandoffDB";
const uri = process.env.DATABASE_MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;

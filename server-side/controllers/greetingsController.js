const asyncHandler = require("express-async-handler");

const GreetingsSchema = require("../models/Greetings");

const Greetings = GreetingsSchema.Greetings;

const getAllGreetings = asyncHandler(async (req, res) => {
  try {
    Greetings.find({}).then((data) => {
      const formattedGreeting = data.map(({ _id, content, userId }) => {
        return { _id, content, userId };
      });

      return formattedGreeting;
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const deleteGreeting = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const greeting = await Greetings.findById(id).exec();

    if (!greeting) {
      return res.status(400).json({ message: "User not found" });
    }
    const result = await greeting.deleteOne();
    const reply = `Greeting ${result.nickname} with ID ${result._id} deleted`;
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllGreetings,
  deleteGreeting,
};

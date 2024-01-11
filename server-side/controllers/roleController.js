const asyncHandler = require("express-async-handler");
const RoleSchema = require("../models/Role");
let Role = RoleSchema.Role;

const getRoles = asyncHandler(async (req, res) => {
  try {
    Role.find({}).then((data) => {
      const formattedRole = data.map(({ _id, name, creationDate }) => {
        return { _id, name, creationDate };
      });
      if (!formattedRole.length) {
        res.status(200).json("No Items found");
      } else {
        res.status(200).json(formattedRole);
        return formattedRole;
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const createNewRole = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const roleDuplicated = await Role.findOne({ name }).lean().exec();

  if (roleDuplicated) {
    res.status(409).json({ message: "role already in database" });
    return;
  } 

  const roleObject = {
    name: name
  };

  const newRole = await Role.create(roleObject);

  if (newRole) {
    res.status(201).json({
      message: `New role '${name}'  has been created`,
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});


module.exports = {
    getRoles,
    createNewRole,
  };
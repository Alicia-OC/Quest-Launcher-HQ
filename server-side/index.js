require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const { log } = require("console");

/* CONFIGURATION */
connectDB();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/root"));
app.use("/vendors", require("./routes/vendorRoutes"));
app.use("/templates", require("./routes/templateRoutes"));
app.use("/languages", require("./routes/languagesRoutes"));
app.use("/request", require("./routes/requestRoutes"))
app.use("/developers", require("./routes/developersRoutes"))
app.use("/games", require("./routes/videogameRoutes"))
app.use("/users", require("./routes/userRoutes"))
app.use("/login", require("./routes/auth"))
app.use("/roles", require("./routes/rolesRoutes"))



app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.on("error", (err) => {
  log(err);
});

app.listen(PORT, () => log("Server started on port 3500"));

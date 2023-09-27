require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const textToVoiceRoutes = require("./routes/textToVoice");
const downloadRoutes = require("./routes/download");

app.use(cors()); // Enable CORS for all routes

app.use("/api/v1/textToVoice", cors(), textToVoiceRoutes);
app.use("/api/v1/download", cors(), downloadRoutes);

app.listen(port, function () {
  console.log("Your App Running on", port);
});

//routes/facebook.js

const express = require("express");
const router = express.Router();
const textToVoiceApi = require("../api/v1/textToVoice"); // Import the Facebook API logic

router.post("/", textToVoiceApi.textToVoiceConverter);

module.exports = router;

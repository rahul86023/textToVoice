const gTTS = require("gtts");
const fs = require("fs");

const textToVoiceConverter = async (req, res) => {
  const { textToSpeak, language } = req.body; // Extract textToSpeak and language from req.body
  const outputFile = "hello.mp3"; // Output file path

  // if (!textToSpeak || !language) {
  //   return res.status(400).json({
  //     success: false,
  //     message:
  //       "Please provide both 'textToSpeak' and 'language' in the request body.",
  //   });
  // }

  try {
    const gtts = new gTTS(textToSpeak, language);
    gtts.save(outputFile, function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Error generating the audio file.",
        });
      }

      // Send the audio file as a response
      fs.readFile(outputFile, function (err, data) {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: "Error reading the audio file.",
          });
        }

        // Set appropriate headers for audio file response
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Content-Type", "audio/mpeg");

        // Send the audio data as the response
        res.status(200).send(data);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the request.",
    });
  }
};

module.exports = {
  textToVoiceConverter,
};

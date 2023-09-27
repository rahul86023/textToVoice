const axios = require("axios");
const stream = require("stream");
const { promisify } = require("util");

const pipeline = promisify(stream.pipeline);

async function download(req, res) {
  const url = req.query.url;
  try {
    const response = await axios.get(url, {
      responseType: "stream",
      onDownloadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // Update download progress if needed
      },
    });

    // Set the appropriate headers for the response
    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
    res.setHeader("Content-Type", "video/mp4");

    // Wait for the pipeline to finish before sending the success response
    try {
      await pipeline(response.data, res);
    } catch (error) {
      if (!res.headersSent) {
        console.error("Error downloading the video", error);
        // Handle or ignore the premature close error if needed
      }
    }
  } catch (error) {
    console.error("Error downloading the video", error);
    // Handle error if needed
    return res
      .status(500)
      .json({ success: false, message: "Error downloading the video" });
  }
}

module.exports = { download };

//current working code
// const axios = require("axios");
// const stream = require("stream");
// const { promisify } = require("util");

// const pipeline = promisify(stream.pipeline);

// async function download(req, res) {
//   const url = req.query.url;
//   try {
//     const response = await axios.get(url, {
//       responseType: "stream",
//       onDownloadProgress: (progressEvent) => {
//         const progress = Math.round(
//           (progressEvent.loaded * 100) / progressEvent.total
//         );
//         // Update download progress if needed
//       },
//     });

//     // Set the appropriate headers for the response
//     res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
//     res.setHeader("Content-Type", "video/mp4");

//     // Wait for the pipeline to finish before sending the success response
//     await pipeline(response.data, res);

//     // Do not send any response here
//   } catch (error) {
//     console.error("Error downloading the video", error);
//     // Handle error if needed
//     return res
//       .status(500)
//       .json({ success: false, message: "Error downloading the video" });
//   }
// }

// module.exports = { download };

const express = require("express");
const router = express.Router();

const downloadApi = require("../api/v1/download");
router.get("/", downloadApi.download);

module.exports = router;

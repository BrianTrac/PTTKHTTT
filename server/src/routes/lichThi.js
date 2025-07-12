const express = require("express");
const router = express.Router();
const lichThiController = require("../controllers/lichThiController");

// GET /api/lichthi
router.get("/", lichThiController.getAllLichThi);

module.exports = router;

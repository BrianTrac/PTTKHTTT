const express = require("express");
const router = express.Router();
const hoaDonController = require("../controllers/hoaDonController");

// GET /api/hoadons/:id
router.get("/:id", hoaDonController.getHoaDonById);

module.exports = router;

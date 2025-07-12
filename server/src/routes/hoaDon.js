const express = require("express");
const router = express.Router();
const hoaDonController = require("../controllers/hoaDonController");

// GET /api/hoadons/:id
router.get("/:id", hoaDonController.getHoaDonById);

// POST /api/hoadons/:id/send-email
router.post("/:id/send-email", hoaDonController.sendInvoiceEmail);

module.exports = router;

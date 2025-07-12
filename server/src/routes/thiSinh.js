const express = require("express");
const router = express.Router();
const thiSinhController = require("../controllers/thiSinhController");

// GET /api/thisinhs/:maThiSinh/chungchis
router.get("/:maThiSinh/chungchis", thiSinhController.getCertificateInfo);

// POST /api/thisinhs/:maThiSinh/chungchis/:maChungChi
router.post(
  "/:maThiSinh/chungchis/:maChungChi",
  thiSinhController.saveCertificateInfo
);

module.exports = router;

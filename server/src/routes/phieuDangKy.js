const express = require("express");
const router = express.Router();
const phieuDangKyController = require("../controllers/phieuDangKyController");

router.get("/", phieuDangKyController.getAllPhieuDangKy);
router.get("/thisinhs/:id", phieuDangKyController.getPhieuDangKyByMaThiSinhId);

module.exports = router;

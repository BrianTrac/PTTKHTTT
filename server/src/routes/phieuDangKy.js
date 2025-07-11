const express = require("express");
const router = express.Router();
const phieuDangKyController = require("../controllers/phieuDangKyController");

router.get("/", phieuDangKyController.getAllPhieuDangKy);

module.exports = router;

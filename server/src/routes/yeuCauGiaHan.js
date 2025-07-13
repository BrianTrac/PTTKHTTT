const express = require("express");
const router = express.Router();
const yeuCauGiaHanController = require("../controllers/yeuCauGiaHanController");

// GET /api/yeucaugiahan/:id
router.get("/:id", yeuCauGiaHanController.getYeuCauGiaHanById);

// POST /api/yeucaugiahan/confirm
router.post("/confirm", yeuCauGiaHanController.confirmYeuCauGiaHan);

// POST /api/yeucaugiahan/reject
router.post("/reject", yeuCauGiaHanController.rejectYeuCauGiaHan);

module.exports = router;

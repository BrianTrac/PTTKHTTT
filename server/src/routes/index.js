const express = require("express");
const router = express.Router();

// Import routes
const phieuDangKyRoutes = require("./phieuDangKy");

// Use routes
router.use("/phieudangky", phieuDangKyRoutes);

// Health
router.get("/health", (req, res) => {
	res.status(200).json({
		success: true,
		message: "API đang hoạt động",
		timestamp: new Date().toISOString(),
	});
});

module.exports = router;

const express = require("express");
const router = express.Router();

// Import routes
const phieuDangKyRoutes = require("./phieuDangKy");
const thiSinhRoutes = require("./thiSinh");

// Use routes
router.use("/phieudangky", phieuDangKyRoutes);
router.use("/thisinhs", thiSinhRoutes);

// Health
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API đang hoạt động",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;

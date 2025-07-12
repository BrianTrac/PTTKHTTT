const express = require("express");
const router = express.Router();

// Import routes
const phieuDangKyRoutes = require("./phieuDangKy");
const thiSinhRoutes = require("./thiSinh");
const hoaDonRoutes = require("./hoaDon");
const yeuCauGiaHanRoutes = require("./yeuCauGiaHan");
const lichThiRoutes = require("./lichThi");

// Use routes
router.use("/phieudangky", phieuDangKyRoutes);
router.use("/thisinhs", thiSinhRoutes);
router.use("/hoadons", hoaDonRoutes);
router.use("/yeucaugiahan", yeuCauGiaHanRoutes);
router.use("/lichthi", lichThiRoutes);

// Health
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API đang hoạt động",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;

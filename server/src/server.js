require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./utils/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await connectDatabase();

		app.listen(PORT, () => {
			console.log(`🚀 Server đang chạy trên port ${PORT}`);
			console.log(`📱 API endpoint: http://localhost:${PORT}/api`);
			console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
			console.log(`📋 Phiếu đăng ký: http://localhost:${PORT}/api/phieudangky`);
		});
	} catch (error) {
		console.error("❌ Lỗi khởi động server:", error);
		process.exit(1);
	}
};

startServer();

process.on("SIGTERM", async () => {
	console.log("SIGTERM received, shutting down gracefully...");
	process.exit(0);
});

process.on("SIGINT", async () => {
	console.log("SIGINT received, shutting down gracefully...");
	process.exit(0);
});

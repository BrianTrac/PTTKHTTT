const { sequelize } = require("../models");

const connectDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("✅ Database connection has been established successfully.");

		// Sync models (tạo bảng nếu chưa tồn tại)
		// Chỉ dùng force: true trong development
		if (process.env.NODE_ENV === "development") {
			await sequelize.sync({ alter: true });
			console.log("✅ Database synchronized successfully.");
		}

		return sequelize;
	} catch (error) {
		console.error("❌ Unable to connect to the database:", error);
		process.exit(1);
	}
};

const closeDatabase = async () => {
	try {
		await sequelize.close();
		console.log("✅ Database connection closed successfully.");
	} catch (error) {
		console.error("❌ Error closing database connection:", error);
	}
};

module.exports = {
	connectDatabase,
	closeDatabase,
};

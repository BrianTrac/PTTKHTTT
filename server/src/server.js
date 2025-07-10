const express = require("express");
const { connectDatabase } = require("./utils/database");

const app = express();

// Middleware
app.use(express.json());

// Kết nối database
connectDatabase();

// Routes
app.get("/", (req, res) => {
	res.send("Welcome to the API!");
});
// app.use("/api/phieudangky", require("./routes/phieuDangKy"));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
	console.log("SIGTERM received, shutting down gracefully...");
	await closeDatabase();
	process.exit(0);
});

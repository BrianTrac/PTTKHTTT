const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// Import routes
const apiRoutes = require("./routes");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Đã xảy ra lỗi server",
		error:
			process.env.NODE_ENV === "development"
				? err.message
				: "Internal Server Error",
	});
});

// 404 handler
app.use("*", (req, res) => {
	res.status(404).json({
		success: false,
		message: "Endpoint không tồn tại",
	});
});

module.exports = app;

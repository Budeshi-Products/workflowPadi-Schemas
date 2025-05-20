import mongoose from "mongoose";

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/workflowpadi";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGODB_URI, {
			// These options are no longer needed in newer versions of Mongoose
			// but included for compatibility
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);

		// Log all registered models
		console.log("\nRegistered Models:");
		Object.keys(mongoose.models).forEach((modelName) => {
			console.log(`- ${modelName}`);
		});

		return conn;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};

// Handle connection events
mongoose.connection.on("connected", () => {
	console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
	console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
	console.log("Mongoose disconnected from MongoDB");
});

// Handle application termination
process.on("SIGINT", async () => {
	try {
		await mongoose.connection.close();
		console.log("Mongoose connection closed through app termination");
		process.exit(0);
	} catch (err) {
		console.error("Error during mongoose disconnection:", err);
		process.exit(1);
	}
});

export default connectDB;

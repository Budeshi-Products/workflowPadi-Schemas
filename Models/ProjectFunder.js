import mongoose from "mongoose";

const ProjectFunderSchema = new mongoose.Schema(
	{
		account: {
			accountName: { type: String, required: true },
			accountNumber: { type: String, required: true },
			bankName: { type: String, required: true },
			balance: { type: String, required: false },
			id: { type: String, required: false },
		},
		funder: { type: String, required: true },
		id: { type: String, required: false },
		projectName: { type: String, required: true },
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

const Project = mongoose.model("ProjectFunder", ProjectFunderSchema);

export default Project;

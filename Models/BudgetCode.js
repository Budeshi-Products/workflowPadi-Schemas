import mongoose from "mongoose";

const budgetCodeSchema = new mongoose.Schema(
	{
		code: { type: String, required: true },
		accountCode: { type: String },
		description: { type: String, required: true },
		project: { type: String, required: true },
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

const BudgetCode = mongoose.model("BudgetCode", budgetCodeSchema);

export default BudgetCode;

import mongoose from "mongoose";

const benefitSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ["Loan", "Salary-Advance", "Bonus", "Commission", "Deduction"],
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		employeeName: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			enum: ["Pending", "Approved", "Rejected"],
			default: "Pending",
		},
		approvedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		name: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		reason: {
			type: String,
		},
		requestDate: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		department: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "department",
		},
		organizationId: {
			type: String,
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

export default mongoose.model("benefit", benefitSchema);

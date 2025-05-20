import mongoose from "mongoose";

const BenefitSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ["Loan", "Salary-Advance", "Bonus", "Commission", "Deduction"],
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
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
			ref: "Employee",
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
			ref: "Department",
		},
		organizationId: {
			type: String,
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

// Export the model with consistent casing
const Benefit = mongoose.model("Benefit", BenefitSchema);
export default Benefit;
export { BenefitSchema as schema };

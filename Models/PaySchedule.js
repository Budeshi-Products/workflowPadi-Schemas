import mongoose from "mongoose";
const { Schema } = mongoose;

const EarningSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			default: 0,
		},
	},
	{ _id: false },
);

const DeductionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			default: 0,
		},
	},
	{ _id: false },
);

const PayScheduleSchema = new Schema(
	{
		scheduleName: {
			type: String,
			default: "",
		},
		payPeriod: {
			type: String,
			enum: ["Daily", "Weekly", "Bi-weekly", "Monthly"],
		},
		workDays: {
			type: Number,
			default: 0,
		},
		payDay: {
			type: String,
			default: "",
		},
		hrPerson: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
		status: {
			type: String,
			enum: ["Approved", "Pending", "Disapproved"],
		},
		approver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
		currency: {
			type: String,
		},
		grossSalary: {
			type: Number,
			default: 0,
		},
		netSalary: {
			type: Number,
			default: 0,
		},
		totalDeductions: {
			type: Number,
			default: 0,
		},
		earnings: [EarningSchema],
		deductions: [DeductionSchema],
		totalPayslip: {
			type: Number,
			default: 0,
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
		deleted: {
			type: Boolean,
			default: false,
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

// Export the model with consistent casing
const PaySchedule = mongoose.model("PaySchedule", PayScheduleSchema);
export default PaySchedule;
export { PayScheduleSchema as schema };

import mongoose from "mongoose";
const { Schema } = mongoose;

const earningSchema = new Schema(
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

const deductionSchema = new Schema(
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

const payslipSchema = new mongoose.Schema(
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
		},
		payDay: {
			type: String,
		},
		hrPerson: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		approvalStatus: {
			type: String,
			enum: ["Approved", "Pending", "Disapproved"],
			default: "Pending",
		},
		paymentStatus: {
			type: String,
			enum: ["Paid", "Unpaid"],
			default: "Unpaid",
		},
		approver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
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
		pension: {
			type: Number,
			default: 0,
		},
		currency: {
			type: String,
		},
		earnings: [earningSchema],
		deductions: [deductionSchema],
		month: {
			type: String,
			default: "",
		},
		year: {
			type: String,
			default: "",
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		serialNumber: {
			type: String,
			default: "",
		},
		uniqueId: {
			type: String,
			default: "",
		},
		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
		},
		deleted: {
			type: Boolean,
			default: false,
		},
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

// Remove incorrect index
// payslipSchema.index({ organizationId: 1, email: 1 }, { unique: true });

// Add appropriate unique index for payslips
payslipSchema.index(
	{
		organizationId: 1,
		employee: 1,
		month: 1,
		year: 1,
		payPeriod: 1,
	},
	{
		unique: true,
		name: "unique_payslip_per_period",
	},
);

export default mongoose.model("payslip", payslipSchema);

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

const payScheduleSchema = new Schema(
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
			ref: "employee",
		},
		status: {
			type: String,
			enum: ["Approved", "Pending", "Disapproved"],
		},
		approver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
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
		earnings: [earningSchema],
		deductions: [deductionSchema],
		totalPayslip: {
			type: Number,
			default: 0,
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		deleted: {
			type: Boolean,
			default: false,
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

export default mongoose.model("paySchedule", payScheduleSchema);

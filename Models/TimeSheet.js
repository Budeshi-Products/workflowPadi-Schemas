import mongoose from "mongoose";

const timeSheetSchema = new mongoose.Schema(
	{
		date: {
			type: String,
			required: [true, "Date is required"],
		},
		projectName: {
			type: String,
			required: [true, "Project name is required"],
		},
		taskDescription: {
			type: String,
			required: [true, "Task description is required"],
		},
		hoursWorked: {
			type: Number,
			required: [true, "Hours worked is required"],
			min: [0, "Hours worked cannot be negative"],
			max: [24, "Hours worked cannot exceed 24"],
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
			required: true,
		},
		approver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		comments: {
			type: String,
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

// Index for organization and employee lookup optimization
timeSheetSchema.index({ organizationId: 1, employee: 1 });
// Index for status queries within an organization
timeSheetSchema.index({ organizationId: 1, status: 1 });
// Index for date-based queries
timeSheetSchema.index({ organizationId: 1, date: 1 });

export default mongoose.model("timeSheet", timeSheetSchema);

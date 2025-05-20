import mongoose from "mongoose";

const TimeSheetSchema = new mongoose.Schema(
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
			ref: "Employee",
			required: true,
		},
		approver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
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
			ref: "Organization",
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

// Index for organization and employee lookup optimization
TimeSheetSchema.index({ organizationId: 1, employee: 1 });
// Index for status queries within an organization
TimeSheetSchema.index({ organizationId: 1, status: 1 });
// Index for date-based queries
TimeSheetSchema.index({ organizationId: 1, date: 1 });

// Export the model with consistent casing
const TimeSheet = mongoose.model("TimeSheet", TimeSheetSchema);
export default TimeSheet;
export { TimeSheetSchema as schema };

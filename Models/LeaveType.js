import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Leave type name is required"],
			trim: true,
		},
		allocation: {
			type: Number,
			required: [true, "Leave days allocation is required"],
			default: 0,
		},
		description: {
			type: String,
			trim: true,
		},
		rolloverConfig: {
			enabled: {
				type: Boolean,
				default: false,
			},
			maxRolloverDays: {
				type: Number,
				default: 0,
				min: 0,
			},
			expiryMonths: {
				type: Number,
				default: 12,
				min: 1,
				max: 24,
			},
			resetDate: {
				type: String,
				enum: ["JANUARY", "APRIL", "JULY", "OCTOBER"],
				default: "JANUARY",
			},
		},
		isDefault: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: true,
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

export default mongoose.model("leaveType", leaveTypeSchema);

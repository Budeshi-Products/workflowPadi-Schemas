import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
	{
		note: {
			type: String,
		},
		leaveType: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "leaveType",
			required: true,
		},
		attachment: {
			public_id: {
				type: String,
				default: "",
			},
			url: {
				type: String,
				default: "",
			},
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		reliefStaff: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		lineManager: {
			// Renamed from hod
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		status: {
			type: String,
			enum: ["pending", "reliefApproved", "reliefRejected", "lineManagerApproved", "lineManagerRejected"],
			default: "pending",
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		resumeDate: {
			type: Date,
		},
		requestDate: {
			type: Date,
		},
		numberOfAbsenceDays: {
			type: Number,
			default: 0,
		},
		dates: [
			{
				title: String,
				start: Date,
				end: Date,
				allDay: Boolean,
			},
		],

		deleted: {
			type: Boolean,
			default: false,
		},
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
			required: true,
			index: true, //index for query performance
		},
	},
	{ timestamps: true },
);

export default mongoose.model("leave", leaveSchema);

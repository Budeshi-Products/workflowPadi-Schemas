import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
	{
		note: {
			type: String,
		},
		leaveType: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "LeaveType",
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
			ref: "Employee",
		},
		reliefStaff: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
		lineManager: {
			// Renamed from hod
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
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
			ref: "Organization",
			required: true,
			index: true, //index for query performance
		},
	},
	{ timestamps: true },
);

const Leave = mongoose.model("Leave", LeaveSchema);
export default Leave;
export { LeaveSchema as schema };

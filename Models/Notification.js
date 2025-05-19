import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		notificationType: {
			type: String,
		},
		msg: {
			type: String,
		},
		tag: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		read: {
			type: Boolean,
			default: false,
		},
		expireAt: {
			type: Date,
			default: Date.now,
			// TTL 30 days: 30 * 24 * 60 * 60, the value is in seconds: the document will be deleted after 30 days
			index: { expires: 2592000 }, // 30 days
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

notificationSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

export default mongoose.model("notification", notificationSchema);

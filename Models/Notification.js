import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
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
			ref: "Employee",
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
			ref: "Organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
export { NotificationSchema as schema };

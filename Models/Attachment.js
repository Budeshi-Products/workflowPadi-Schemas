import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
	{
		uploader: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		fileLink: {
			type: String,
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

attachmentSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

export default mongoose.model("attachment", attachmentSchema);

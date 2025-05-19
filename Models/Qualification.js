import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			default: "",
		},
		institution: {
			type: String,
			default: "",
		},
		year: {
			type: String,
			default: "",
		},
		certificateNumber: {
			type: String,
			default: "",
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

	{
		timestamps: true,
	},
);

qualificationSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

export default mongoose.model("qualification", qualificationSchema);

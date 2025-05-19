import mongoose from "mongoose";

const guarantorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: "",
		},
		phone: {
			type: String,
			default: "",
		},
		email: {
			type: String,
			default: "",
		},
		address: {
			type: String,
			default: "",
		},
		placeOfWork: {
			type: String,
			default: "",
		},
		designation: {
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
	{ timestamps: true },
);

guarantorSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

export default mongoose.model("guarantor", guarantorSchema);

import mongoose from "mongoose";

const nextOfKinSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			default: "",
		},
		lastName: {
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
		relationship: {
			type: String,
			default: "",
		},
		address: {
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

nextOfKinSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

export default mongoose.model("nextOfKin", nextOfKinSchema);

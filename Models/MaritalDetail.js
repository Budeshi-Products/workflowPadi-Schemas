import mongoose from "mongoose";

const maritalDetailSchema = new mongoose.Schema(
	{
		nameOfSpouse: {
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
		phone: {
			type: String,
			default: "",
		},
		dateOfJoining: {
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

maritalDetailSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

export default mongoose.model("maritalDetail", maritalDetailSchema);

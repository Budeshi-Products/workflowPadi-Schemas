import mongoose from "mongoose";

const MaritalDetailSchema = new mongoose.Schema(
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
			ref: "Employee",
		},
		deleted: {
			type: Boolean,
			default: false,
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

MaritalDetailSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

// Export the model with consistent casing
const MaritalDetail = mongoose.model("MaritalDetail", MaritalDetailSchema);
export default MaritalDetail;
export { MaritalDetailSchema as schema };

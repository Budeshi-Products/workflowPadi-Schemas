import mongoose from "mongoose";

const NextOfKinSchema = new mongoose.Schema(
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

NextOfKinSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

// Export the model with consistent casing
const NextOfKin = mongoose.model("NextOfKin", NextOfKinSchema);
export default NextOfKin;
export { NextOfKinSchema as schema };

import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema(
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

	{
		timestamps: true,
	},
);

// Export the model with consistent casing
const Qualification = mongoose.model("Qualification", QualificationSchema);
export default Qualification;
export { QualificationSchema as schema };

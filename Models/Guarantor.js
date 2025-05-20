import mongoose from "mongoose";

const GuarantorSchema = new mongoose.Schema(
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

GuarantorSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

// Export the model with consistent casing
const Guarantor = mongoose.model("Guarantor", GuarantorSchema);
export default Guarantor;
export { GuarantorSchema as schema };

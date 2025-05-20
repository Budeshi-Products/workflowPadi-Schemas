import mongoose from "mongoose";

const BankDetailSchema = new mongoose.Schema(
	{
		bankName: {
			type: String,
			default: "",
		},
		accountNumber: {
			type: String,
			default: "",
		},
		accountHolderName: {
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

BankDetailSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

// Export the model with consistent casing
const BankDetail = mongoose.model("BankDetail", BankDetailSchema);
export default BankDetail;
export { BankDetailSchema as schema };

import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
	{
		accountName: {
			type: String,
		},
		accountNumber: {
			type: String,
		},
		bankName: {
			type: String
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
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

// Export the model with consistent casing
const Account = mongoose.model("Account", AccountSchema);
export default Account;
export { AccountSchema as schema };

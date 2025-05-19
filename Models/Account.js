import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
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
			ref: "organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

const Account = mongoose.model("Account", accountSchema);

export default Account;

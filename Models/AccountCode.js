import mongoose, { Model } from "mongoose";

const AccountCodeSchema = new mongoose.Schema(
	{
		description: { type: String, required: true },
		value: { type: Number, required: true },
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

const AccountCode = mongoose.model("AccountCode", AccountCodeSchema);

export default AccountCode;

import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
	{
		title: String,
		projectCode: String,
		number: Number,
		category: String,
		duration: String,
		awardedDate: Date,
		value: Number,
		currency: {
			type: String,
			enum: ["NGN", "USD", "EUR"],
			default: "NGN",
		},
		description: String,
		status: {
			enum: ["open", "closed", "awarded"],
			type: String,
			default: "open",
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
		awardedVendor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Vendor",
		},
		applicants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Vendor",
			},
		],
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;

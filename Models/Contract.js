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
			ref: "employee",
		},
		awardedVendor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "vendor",
		},
		applicants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "vendor",
			},
		],
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;

import mongoose from "mongoose";

const bankDetailSchema = new mongoose.Schema(
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
			ref: "employee",
		},
		deleted: {
			type: Boolean,
			default: false,
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

bankDetailSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

export default mongoose.model("bankDetail", bankDetailSchema);

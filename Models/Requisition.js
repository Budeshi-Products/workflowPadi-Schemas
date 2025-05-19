import mongoose from "mongoose";

const RequisitionSchema = new mongoose.Schema(
	{
		accountName: { type: String, required: true },
		accountNumber: { type: String, required: true },
		amountInWords: { type: String, required: true },
		budgetHolder: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
		reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
		approver: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
		bankName: { type: String, required: true },
		codes: String,
		countRef: Number,
		currency: {
			type: String,
			required: true,
		},
		checkDate: Date,
		reviewDate: Date,
		approveDate: Date,
		projectChargedTo: {
			account: {
				accountName: String,
				accountNumber: String,
				balance: String,
				bankName: String,
				id: String,
			},
			funder: String,
			id: String,
			projectName: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		title: { type: String, required: true },
		budgetLineItems: [
			{
				label: String,
				value: String,
				code: String,
				project: String,
				description: String,
			},
		],
		supportingDocuments: [
			{
				id: String,
				name: String,
				url: String,
			},
		],
		items: [
			{
				amount: { type: Number, required: true },
				code: String,
				title: { type: String, required: true },
			},
		],
		projectName: String,
		pvNumber: Number,
		sourceAccountNumber: String,
		sourceBankName: String,
		status: {
			type: String,
			default: "pending",
			enum: [
				"pending",
				"checked",
				"reviewed",
				"approved",
				"sentBack",
				"cancelled",
				"deleted",
			],
		},
		step: Number,
		taxPercentage: String,
		isTaxable: Boolean,
		vendorTIN: String,
		vendorBusinessName: String,
		time: Date,
		total: { type: String, required: true },
		type: { type: String, required: true },
		userId: { type: String, required: true },
		retiredStatus: {
			type: String,
			enum: ["requested", "retired", "pending"],
			default: "pending",
		},
		paid: { type: Boolean, default: false },
		serialNumber: { type: String, required: true },
		approvalNumber: String,
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
			required: true,
			index: true,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

const Requisition = mongoose.model("Requisition", RequisitionSchema);

export default Requisition;

import mongoose from "mongoose";

const ExitManagementSchema = new mongoose.Schema(
	{
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
			required: true,
			index: true,
		},
		exitType: {
			type: String,
			enum: [
				"RESIGNATION",
				"TERMINATION",
				"RETIREMENT",
				"END_OF_CONTRACT",
				"DEATH",
			],
			required: true,
		},
		status: {
			type: String,
			enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
			default: "PENDING",
		},
		// Exit Process Details
		noticeDate: {
			type: Date,
			required: true,
		},
		lastWorkingDay: {
			type: Date,
			required: true,
		},
		actualExitDate: {
			type: Date,
		},
		reason: {
			type: String,
			required: true,
		},
		// Exit Interview
		exitInterview: {
			conducted: {
				type: Boolean,
				default: false,
			},
			conductedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Employee",
			},
			conductedDate: Date,
			feedback: {
				workEnvironment: {
					rating: { type: Number, min: 1, max: 5 },
					comments: String,
				},
				management: {
					rating: { type: Number, min: 1, max: 5 },
					comments: String,
				},
				growthOpportunities: {
					rating: { type: Number, min: 1, max: 5 },
					comments: String,
				},
				compensation: {
					rating: { type: Number, min: 1, max: 5 },
					comments: String,
				},
				workLifeBalance: {
					rating: { type: Number, min: 1, max: 5 },
					comments: String,
				},
				overallExperience: {
					rating: { type: Number, min: 1, max: 5 },
					comments: String,
				},
				recommendations: String,
				rehireEligibility: {
					type: Boolean,
					default: null,
				},
				rehireComments: String,
			},
		},
		// Handover Process
		handoverStatus: {
			type: String,
			enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
			default: "PENDING",
		},
		handoverItems: [
			{
				item: String,
				status: {
					type: String,
					enum: ["PENDING", "COMPLETED"],
					default: "PENDING",
				},
				assignedTo: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Employee",
				},
				completedDate: Date,
				comments: String,
			},
		],
		// Clearance Process
		clearanceStatus: {
			type: String,
			enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
			default: "PENDING",
		},
		clearanceItems: [
			{
				department: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Department",
				},
				status: {
					type: String,
					enum: ["PENDING", "APPROVED", "REJECTED"],
					default: "PENDING",
				},
				approvedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Employee",
				},
				approvedDate: Date,
				comments: String,
			},
		],
		// Final Settlement
		finalSettlement: {
			status: {
				type: String,
				enum: ["PENDING", "PROCESSED", "COMPLETED"],
				default: "PENDING",
			},
			processedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Employee",
			},
			processedDate: Date,
			amount: Number,
			components: [
				{
					type: String,
					amount: Number,
					description: String,
				},
			],
			paymentDate: Date,
			paymentReference: String,
		},
		// Documentation
		documents: [
			{
				type: {
					type: String,
					enum: [
						"RESIGNATION_LETTER",
						"EXIT_INTERVIEW",
						"CLEARANCE_FORM",
						"SETTLEMENT_LETTER",
						"OTHER",
					],
				},
				name: String,
				url: String,
				uploadedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Employee",
				},
				uploadedDate: Date,
			},
		],
		// Additional Information
		knowledgeTransfer: {
			required: { type: Boolean, default: false },
			completed: { type: Boolean, default: false },
			details: String,
			completedDate: Date,
		},
		replacementHired: {
			type: Boolean,
			default: false,
		},
		replacementEmployee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
		notes: String,
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
	},
	{
		timestamps: true,
	},
);

// Indexes for better query performance
ExitManagementSchema.index({ organizationId: 1, employee: 1 });
ExitManagementSchema.index({ organizationId: 1, status: 1 });
ExitManagementSchema.index({ organizationId: 1, exitType: 1 });
ExitManagementSchema.index({ organizationId: 1, lastWorkingDay: 1 });

// Export the model with consistent casing
const ExitManagement = mongoose.model("ExitManagement", ExitManagementSchema);
export default ExitManagement;
export { ExitManagementSchema as schema };

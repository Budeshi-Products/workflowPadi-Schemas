import mongoose from "mongoose";

const performanceManagementSchema = new mongoose.Schema(
	{
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
			required: true,
		},
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
			required: true,
			index: true,
		},
		reviewPeriod: {
			type: String,
			enum: ["QUARTERLY", "BIANNUAL", "ANNUAL"],
			required: true,
		},
		reviewYear: {
			type: Number,
			required: true,
		},
		reviewQuarter: {
			type: Number,
			enum: [1, 2, 3, 4],
			required: function () {
				return this.reviewPeriod === "QUARTERLY";
			},
		},
		reviewMonth: {
			type: Number,
			enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			required: function () {
				return this.reviewPeriod === "BIANNUAL";
			},
		},
		status: {
			type: String,
			enum: ["DRAFT", "IN_PROGRESS", "PENDING_REVIEW", "COMPLETED", "ARCHIVED"],
			default: "DRAFT",
		},
		// Goals and Objectives
		goals: [
			{
				title: {
					type: String,
					required: true,
				},
				description: String,
				category: {
					type: String,
					enum: ["BUSINESS", "PERSONAL", "TEAM", "PROJECT", "OTHER"],
					required: true,
				},
				startDate: Date,
				targetDate: Date,
				status: {
					type: String,
					enum: [
						"NOT_STARTED",
						"IN_PROGRESS",
						"COMPLETED",
						"DELAYED",
						"CANCELLED",
					],
					default: "NOT_STARTED",
				},
				progress: {
					type: Number,
					min: 0,
					max: 100,
					default: 0,
				},
				weightage: {
					type: Number,
					min: 0,
					max: 100,
					default: 0,
				},
				kpis: [
					{
						name: String,
						target: Number,
						actual: Number,
						unit: String,
						weightage: Number,
					},
				],
				comments: [
					{
						text: String,
						addedBy: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "employee",
						},
						addedAt: {
							type: Date,
							default: Date.now,
						},
					},
				],
			},
		],
		// Performance Ratings
		ratings: {
			overall: {
				score: {
					type: Number,
					min: 1,
					max: 5,
				},
				comments: String,
				ratedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "employee",
				},
				ratedAt: Date,
			},
			competencies: [
				{
					competency: {
						type: String,
						required: true,
					},
					score: {
						type: Number,
						min: 1,
						max: 5,
					},
					comments: String,
				},
			],
			keyResults: [
				{
					goal: {
						type: mongoose.Schema.Types.ObjectId,
						refPath: "goals._id",
					},
					score: {
						type: Number,
						min: 1,
						max: 5,
					},
					comments: String,
				},
			],
		},
		// Self Assessment
		selfAssessment: {
			submitted: {
				type: Boolean,
				default: false,
			},
			submittedAt: Date,
			achievements: [
				{
					description: String,
					impact: String,
					date: Date,
				},
			],
			challenges: [
				{
					description: String,
					actions: String,
					date: Date,
				},
			],
			developmentNeeds: [
				{
					area: String,
					actionPlan: String,
					timeline: String,
				},
			],
			comments: String,
		},
		// Manager Assessment
		managerAssessment: {
			submitted: {
				type: Boolean,
				default: false,
			},
			submittedAt: Date,
			submittedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "employee",
			},
			strengths: [String],
			areasOfImprovement: [String],
			developmentPlan: {
				objectives: [String],
				actions: [String],
				timeline: String,
				resources: [String],
			},
			comments: String,
			recommendations: {
				promotion: {
					type: Boolean,
					default: false,
				},
				salaryReview: {
					type: Boolean,
					default: false,
				},
				training: {
					type: Boolean,
					default: false,
				},
				comments: String,
			},
		},
		// Review Meeting
		reviewMeeting: {
			scheduled: {
				type: Boolean,
				default: false,
			},
			scheduledDate: Date,
			conducted: {
				type: Boolean,
				default: false,
			},
			conductedDate: Date,
			attendees: [
				{
					employee: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "employee",
					},
					role: {
						type: String,
						enum: ["REVIEWER", "OBSERVER", "HR"],
					},
				},
			],
			minutes: String,
			actionItems: [
				{
					description: String,
					assignedTo: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "employee",
					},
					dueDate: Date,
					status: {
						type: String,
						enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
						default: "PENDING",
					},
				},
			],
		},
		// Final Review
		finalReview: {
			status: {
				type: String,
				enum: ["PENDING", "APPROVED", "REJECTED"],
				default: "PENDING",
			},
			approvedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "employee",
			},
			approvedAt: Date,
			comments: String,
		},
		// Additional Information
		attachments: [
			{
				type: {
					type: String,
					enum: [
						"SELF_ASSESSMENT",
						"MANAGER_ASSESSMENT",
						"REVIEW_MEETING",
						"DEVELOPMENT_PLAN",
						"OTHER",
					],
				},
				name: String,
				url: String,
				uploadedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "employee",
				},
				uploadedAt: Date,
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
			required: true,
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
	},
	{
		timestamps: true,
	},
);

// Indexes for better query performance
performanceManagementSchema.index({
	organizationId: 1,
	employee: 1,
	reviewYear: 1,
	reviewPeriod: 1,
});
performanceManagementSchema.index({ organizationId: 1, status: 1 });
performanceManagementSchema.index({
	organizationId: 1,
	"ratings.overall.score": 1,
});
performanceManagementSchema.index({ organizationId: 1, "goals.status": 1 });

export default mongoose.model(
	"performanceManagement",
	performanceManagementSchema,
);

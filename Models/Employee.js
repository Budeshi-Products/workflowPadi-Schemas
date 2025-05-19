import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
	{
		personalInformation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "personalInformation",
		},
		bankDetail: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "bankDetail",
		},
		nextOfKin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "nextOfKin",
		},
		maritalDetail: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "maritalDetail",
		},
		guarantors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "guarantor",
			},
		],
		qualifications: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "qualification",
			},
		],
		department: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "department",
		},
		email: {
			type: String,
			unique: true, // Corrected typo: unqiue -> unique
		},
		phone: {
			type: String,
			default: "",
		},
		firstName: {
			type: String,
			default: "",
		},
		lastName: {
			type: String,
			default: "",
		},
		employmentDate: {
			type: String,
			default: "",
		},
		employeeID: {
			type: String,
			default: "",
		},
		employmentType: {
			type: String,
			enum: ["Contractor", "Intern", "Full-time", "Part-time", "Pending", ""],
			default: "Pending",
		},
		status: {
			type: String,
			enum: ["RETIRED", "ACTIVE", "INACTIVE", "RESIGNED", "SUSPENDED", "LEAVE"],
			default: "ACTIVE",
		},
		terminationDate: { type: Date },
		resignationDate: { type: Date },
		retirementDate: { type: Date },
		suspensionDate: { type: Date },
		leaveStartDate: { type: Date },
		lastStatusUpdate: { type: Date },
		personType: {
			type: String,
			default: "",
		},
		permissions: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "permission",
		},
		grade: {
			type: String,
			default: "",
		},
		jobRole: {
			type: String,
			default: "",
		},
		jobTitle: {
			type: String,
			default: "",
		},
		officeBranch: {
			type: String,
			default: "",
		},
		paymentType: {
			type: String,
			enum: ["Weekly", "Daily", "Monthly"],
			default: "Monthly",
		},
		workingHours: {
			type: String,
			default: "",
		},
		photo: {
			public_id: {
				type: String,
				default: "",
			},
			url: {
				type: String,
				default: "",
			},
		},
		password: {
			type: String,
		},
		isOnboarded: {
			type: Boolean,
			default: false,
		},
		lastVisited: {
			type: Date,
			default: new Date(),
		},
		otp: {
			type: String,
			default: "",
		},
		otpExpires: {
			type: Date,
			default: null,
		},
		resetToken: {
			type: String,
			default: "",
		},
		resetTokenExpires: {
			type: Date,
			default: null,
		},
		lockUntil: Date,
		failedLoginAttempts: {
			type: Number,
			default: 0,
		},
		lastLogin: Date,
		notificationSwitch: {
			type: String,
			enum: ["on", "off"],
			default: "on",
		},
		performanceRating: {
			type: Number,
			default: 0,
			min: [0, "Rating cannot be less than 0"],
			max: [5, "Rating cannot be more than 5"],
		},
		satisfactionRating: {
			type: Number,
			default: 0,
			min: [0, "Rating cannot be less than 0"],
			max: [5, "Rating cannot be more than 5"],
		},
		totalAlocateLeave: {
			type: Number,
			default: 0,
		},
		leaveBalance: {
			type: Number,
			default: 0,
		},
		deleted: {
			type: Boolean,
			default: false,
		},
		mfaEnabled: {
			type: Boolean,
			default: false,
		},
		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
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

employeeSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

// Add pre-save hook to sync jobRole and jobTitle
employeeSchema.pre("save", async function (next) {
	// Sync jobRole and jobTitle if either is modified
	if (this.isModified("jobRole")) {
		this.jobTitle = this.jobRole;
	} else if (this.isModified("jobTitle")) {
		this.jobRole = this.jobTitle;
	}

	// Handle permissions creation for new employees
	if (this.isNew && !this.permissions) {
		const Permission = mongoose.model("permission");
		try {
			const defaultPermissions = new Permission({
				employee: this._id,
				organizationId: this.organizationId,
			});
			await defaultPermissions.save();
			this.permissions = defaultPermissions._id;
		} catch (error) {
			console.error("Error creating default permissions for employee:", error);
			return next(error);
		}
	}
	next();
});

// Add middleware to remove permissions when an employee is removed
employeeSchema.post("findOneAndRemove", async function (doc) {
	if (doc && doc.permissions) {
		const Permission = mongoose.model("permission");
		try {
			await Permission.findByIdAndRemove(doc.permissions);
		} catch (error) {
			console.error("Error removing permissions for deleted employee:", error);
			// Log the error, but typically don't block the process
		}
	}
});

export default mongoose.model("employee", employeeSchema);

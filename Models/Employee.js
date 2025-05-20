import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
	{
		personalInformation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "PersonalInformation",
		},
		bankDetail: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BankDetail",
		},
		nextOfKin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "NextOfKin",
		},
		maritalDetail: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MaritalDetail",
		},
		guarantors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Guarantor",
			},
		],
		qualifications: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Qualification",
			},
		],
		department: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Department",
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
			ref: "Permission",
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
			ref: "Organization",
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

EmployeeSchema.index({ organizationId: 1, email: 1 }, { unique: true }); // this is to ensure that the email is unique per organization

// Add pre-save hook to sync jobRole and jobTitle
EmployeeSchema.pre("save", async function (next) {
	// Sync jobRole and jobTitle if either is modified
	if (this.isModified("jobRole")) {
		this.jobTitle = this.jobRole;
	} else if (this.isModified("jobTitle")) {
		this.jobRole = this.jobTitle;
	}

	// Handle permissions creation for new employees
	if (this.isNew && !this.permissions) {
		const Permission = mongoose.model("Permission");
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
EmployeeSchema.post("findOneAndRemove", async function (doc) {
	if (doc && doc.permissions) {
		const Permission = mongoose.model("Permission");
		try {
			await Permission.findByIdAndRemove(doc.permissions);
		} catch (error) {
			console.error("Error removing permissions for deleted employee:", error);
			// Log the error, but typically don't block the process
		}
	}
});

// Export the model with consistent casing
const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
export { EmployeeSchema as schema };

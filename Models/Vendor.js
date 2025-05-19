import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const vendorSchema = new mongoose.Schema(
	{
		accountDetails: {
			holderName: String,
			number: String,
			bankName: String,
		},
		documents: [
			{
				public_id: String,
				name: String,
				url: String,
			},
		],
		contactPerson: {
			name: String,
			phoneNumber: String,
			email: String,
		},
		businessDetails: {
			businessName: String,
			cacRegNumber: String,
			tinNumber: String,
			rcNumber: String,
			registeredAddress: String,
			physicalAddress: String,
			functionalMailAddress: String,
		},
		status: {
			enum: ["pending", "verified", "rejected"],
			type: String,
			default: "pending",
		},
		approvedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		categories: [String],
		password: String,
		resetToken: String,
		resetTokenExpires: { type: Date },
		lockUntil: { type: Date },
		history: [
			{
				activity: String,
			},
		],
		lastVisited: {
			type: Date,
			default: new Date(),
		},
		lastLogin: Date,
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

// Hash password before saving
vendorSchema.pre("save", async function (next) {
	try {
		if (this.isModified("password") && this.password) {
			const hashedPassword = await bcrypt.hash(this.password, 10);
			this.password = hashedPassword;
		}
		next();
	} catch (error) {
		next(error);
	}
});

// Compare passwords
vendorSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

// Check if account is locked
vendorSchema.methods.isLocked = function () {
	return !!(this.lockUntil && this.lockUntil > new Date());
};

const Vendor = mongoose.model("vendor", vendorSchema);
export default Vendor;

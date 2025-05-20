import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const VendorSchema = new mongoose.Schema(
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
			ref: "Employee",
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
			ref: "Organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

// Hash password before saving
VendorSchema.pre("save", async function (next) {
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
VendorSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

// Check if account is locked
VendorSchema.methods.isLocked = function () {
	return !!(this.lockUntil && this.lockUntil > new Date());
};

// Export the model with consistent casing
const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
export { VendorSchema as schema };

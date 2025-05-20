import mongoose from "mongoose";
const { model, Schema } = mongoose;

const RefreshTokenSchema = new Schema(
	{
		token: String,
		employeeId: String,
		expiryDate: Date,
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Organization",
		},
	},
	{ timestamps: true },
);

// Create proper indexes
RefreshTokenSchema.index({ token: 1 }, { unique: true });
RefreshTokenSchema.index({ employeeId: 1 });
RefreshTokenSchema.index({ organizationId: 1 });

// Export the model with consistent casing
const RefreshToken = model("RefreshToken", RefreshTokenSchema);
export default RefreshToken;
export { RefreshTokenSchema as schema };

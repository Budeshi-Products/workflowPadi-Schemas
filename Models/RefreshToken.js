import mongoose from "mongoose";
const { model, Schema } = mongoose;

const refreshTokenSchema = new Schema(
	{
		token: String,
		employeeId: String,
		expiryDate: Date,
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization",
		},
	},
	{ timestamps: true },
);

// Create proper indexes
refreshTokenSchema.index({ token: 1 }, { unique: true });
refreshTokenSchema.index({ employeeId: 1 });
refreshTokenSchema.index({ organizationId: 1 });

export default model("refreshToken", refreshTokenSchema);

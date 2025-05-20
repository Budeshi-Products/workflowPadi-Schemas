import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		website: {
			type: String,
			default: "",
		},
		acronym: {
			type: String,
			required: true,
			trim: true,
			default: "",
		},
		overview: {
			type: String,
			default: "",
		},
		socialMedia: [
			{
				platform: {
					type: String,
					default: "",
				},
				handle: {
					type: String,
					default: "",
				},
			},
		],
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		phone: {
			type: String,
			default: "",
		},
		address: {
			street: {
				type: String,
				default: "",
			},
			city: {
				type: String,
				default: "",
			},
			state: {
				type: String,
				default: "",
			},
			country: {
				type: String,
				default: "",
			},
			postalCode: {
				type: String,
				default: "",
			},
		},
		logo: {
			public_id: {
				type: String,
				default: "",
			},
			url: {
				type: String,
				default: "",
			},
		},
		dateFounded: {
			type: Date,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		verificationCode: {
			type: String,
			default: null,
		},
		isActive: { type: Boolean, default: true },
		agreedToPrivacyPolicy: {
			type: Boolean,
			default: false,
		},
		deleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

// Single index definition for email
OrganizationSchema.index({ email: 1 }, { background: true });

// Helper method to register this model with any connection
OrganizationSchema.statics.registerModel = function (connection) {
	try {
		return connection.model("Organization", OrganizationSchema);
	} catch (error) {
		// Model is already registered
		return connection.model("Organization");
	}
};

// For default connection - use consistent casing
const Organization = mongoose.model("Organization", OrganizationSchema);

// Export the model and schema
export default Organization;
export { OrganizationSchema as schema };
export const registerModel = OrganizationSchema.statics.registerModel;

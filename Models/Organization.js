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
			type: String,
			default: "",
		},
		country: {
			type: String,
			default: "",
		},
		city: {
			type: String,
			default: "",
		},
		zip: {
			type: String,
			default: "",
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
		active: { type: Boolean, default: true },
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

// add indexes of email , name and acronym
OrganizationSchema.index({ email: 1 }, { background: true });

// Helper method to register this model with any connection
OrganizationSchema.statics.registerModel = function (connection) {
	try {
		return connection.model("organization", OrganizationSchema);
	} catch (error) {
		// Model is already registered
		return connection.model("organization");
	}
};

// For default connection
const Organization = mongoose.model("organization", OrganizationSchema);

export default Organization;
// Also export the schema for direct usage with specific connections
export { OrganizationSchema as schema, OrganizationSchema.statics.registerModel as registerModel };

import mongoose from "mongoose";

const personalInformationSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unqiue: true,
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
		title: {
			type: String,
			default: "",
		},
		signature: {
			public_id: {
				type: String,
				default: "",
			},
			url: {
				type: String,
				default: "",
			},
		},
		dateOfBirth: {
			type: Date,
		},
		gender: {
			type: String,
			enum: ["Male", "Female"],
		},
		nationality: {
			type: String,
			default: "",
		},
		meansOfId: {
			type: String,
			default: "",
		},
		idNumber: {
			type: String,
			default: "",
		},
		pensionNumber: {
			type: String,
			default: "",
		},
		nhisNumber: {
			type: String,
			default: "",
		},
		healthInsuranceNumber: {
			type: String,
			default: "",
		},
		taxNumber: {
			type: String,
			default: "",
		},
		street: {
			type: String,
			default: "",
		},
		apartment: {
			type: String,
			default: "",
		},
		zip: {
			type: String,
			default: "",
		},
		city: {
			type: String,
			default: "",
		},
		country: {
			type: String,
			default: "",
		},
		address: {
			type: String,
			get: function () {
				const addressComponents = [
					this.street,
					this.apartment,
					this.zip,
					this.city,
					this.country,
				];
				return addressComponents.filter(Boolean).join(", ");
			},
		},
		maritalStatus: {
			type: String,
			enum: ["Married", "Single", "Divorced", "Others"],
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},
		deleted: {
			type: Boolean,
			default: false,
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

// Pre-save hook to update the address field before saving the document
personalInformationSchema.pre("save", function (next) {
	const addressComponents = [
		this.street,
		this.apartment,
		this.zip,
		this.city,
		this.country,
	];
	this.address = addressComponents.filter(Boolean).join(", ");
	next();
});

personalInformationSchema.index(
	{ organizationId: 1, email: 1 },
	{ unique: true },
); // this is to ensure that the email is unique per organization

export default mongoose.model(
	"personalInformation",
	personalInformationSchema,
);

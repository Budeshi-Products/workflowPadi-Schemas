import mongoose from "mongoose";
const { model, Schema } = mongoose;

const TeamSchema = new Schema(
	{
		name: {
			type: String,
		},

		description: {
			type: String,
		},

		team_count: {
			type: Number,
			default: 0,
		},

		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Employee",
			},
		],

		deleted: {
			type: Boolean,
			default: false,
		},

		organizationId: {
			type: Schema.Types.ObjectId,
			ref: "Organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

// Export the model with consistent casing
const Team = model("Team", TeamSchema);
export default Team;
export { TeamSchema as schema };

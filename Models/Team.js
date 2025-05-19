import mongoose from "mongoose";
const { model, Schema } = mongoose;

let teamSchema = new Schema(
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
				ref: "employee",
			},
		],

		deleted: {
			type: Boolean,
			default: false,
		},

		organizationId: {
			type: Schema.Types.ObjectId,
			ref: "organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);
 
let Team = model("team", teamSchema);

export default Team;
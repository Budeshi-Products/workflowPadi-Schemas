import mongoose from "mongoose";
const { model, Schema } = mongoose;

let projectSchema = new Schema(
	{
		name: {
			type: String,
		},

		description: {
			type: String,
		},

		tasks: [
			{
				type: mongoose.Types.ObjectId,
				ref: "task",
			},
		],
		documents: [String],
		kanbanColumns: [
			{
				type: mongoose.Types.ObjectId,
				ref: "kanbancolumn",
			},
		],
		team: {
			type: mongoose.Types.ObjectId,
			ref: "team",
		},
		teams: [
			{
				type: mongoose.Types.ObjectId,
				ref: "team",
			},
		],
		priority: {
			type: String,
		},

		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
		},

		suspended: {
			type: Boolean,
			default: false,
		},
		done: {
			type: Boolean,
			default: false,
		},
		archived: {
			type: Boolean,
			default: false,
		},

		deleted: {
			type: Boolean,
			default: false,
		},

		dueDate: {
			type: Date,
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

let Project = model("project", projectSchema);

export default Project;

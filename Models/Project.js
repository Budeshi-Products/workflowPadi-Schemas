import mongoose from "mongoose";
const { model, Schema } = mongoose;

const ProjectSchema = new Schema(
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
				ref: "Task",
			},
		],
		documents: [String],
		kanbanColumns: [
			{
				type: mongoose.Types.ObjectId,
				ref: "KanbanColumn",
			},
		],
		team: {
			type: mongoose.Types.ObjectId,
			ref: "Team",
		},
		teams: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Team",
			},
		],
		priority: {
			type: String,
		},

		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
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
			ref: "Organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

// Export the model with consistent casing
const Project = model("Project", ProjectSchema);
export default Project;
export { ProjectSchema as schema };

import mongoose from "mongoose";
const { model, Schema } = mongoose;

const TaskSchema = new Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		assignees: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Employee",
			},
		],
		documents: [String],
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Comment",
			},
		],
		subTasks: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Task",
			},
		],
		priority: {
			type: String,
		},
		kpiIndicator: {
			type: String,
		},
		// Replace the fixed status with a reference to the column
		column: {
			type: mongoose.Types.ObjectId,
			ref: "KanbanColumn",
		},
		// Keep the status field for backward compatibility but mark as deprecated
		status: {
			type: String,
			enum: ["todo", "inprogress", "inreview", "done"],
			default: "todo",
			deprecated: true,
		},
		dueDate: {
			type: Date,
		},
		progress: {
			type: Number,
			default: 0,
			min: 0,
			max: 100,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		organizationId: {
			type: Schema.Types.ObjectId,
			ref: "Organization",
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

// Update the pre-save hook to work with the new column-based approach
TaskSchema.pre("save", async function (next) {
	try {
		// If using new column system
		if (this.column) {
			// Populate the column to get its progressValue and isCompletedStage
			const populatedTask = await this.populate("column");
			if (populatedTask.column) {
				this.progress = populatedTask.column.progressValue;
				this.completed = populatedTask.column.isCompletedStage;
			}
		}
		// Fallback to the old system
		else if (this.status) {
			const STATUS_PERCENTAGES = {
				todo: 0,
				inprogress: 25,
				inreview: 50,
				done: 100,
			};
			this.progress = STATUS_PERCENTAGES[this.status] || 0;
			this.completed = this.status === "done";
		}

		next();
	} catch (error) {
		next(error);
	}
});

// Export the model with consistent casing
const Task = model("Task", TaskSchema);
export default Task;
export { TaskSchema as schema };

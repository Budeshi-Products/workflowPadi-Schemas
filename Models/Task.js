import mongoose from "mongoose";
const { model, Schema } = mongoose;

let taskSchema = new Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
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
				ref: "employee",
			},
		],
		documents: [String],
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: "comment",
			},
		],
		subTasks: [
			{
				type: mongoose.Types.ObjectId,
				ref: "task",
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
			ref: "kanbancolumn",
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
			ref: "organization",
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

// Update the pre-save hook to work with the new column-based approach
taskSchema.pre("save", async function (next) {
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

let Task = model("task", taskSchema);

export default Task;

import mongoose from "mongoose";
const { model, Schema } = mongoose;

const kanbanColumnSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		order: {
			type: Number,
			default: 0,
		},
		color: {
			type: String,
			default: "#FFFFFF",
		},
		progressValue: {
			type: Number,
			default: 0,
			min: 0,
			max: 100,
		},
		isCompletedStage: {
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

const KanbanColumn = model("kanbancolumn", kanbanColumnSchema);

export default KanbanColumn;

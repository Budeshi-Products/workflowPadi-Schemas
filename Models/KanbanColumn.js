import mongoose from "mongoose";
const { model, Schema } = mongoose;

const KanbanColumnSchema = new Schema(
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
			ref: "Organization",
			required: true,
			index: true,
		},
	},
	{ timestamps: true },
);

const KanbanColumn = model("KanbanColumn", KanbanColumnSchema);
export default KanbanColumn;
export { KanbanColumnSchema as schema };

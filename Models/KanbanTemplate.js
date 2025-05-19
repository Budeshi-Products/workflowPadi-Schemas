import mongoose from "mongoose";
const { model, Schema } = mongoose;

const kanbanTemplateSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		columns: [
			{
				type: Schema.Types.ObjectId,
				ref: "kanbancolumn",
				required: true,
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "employee",
			required: true,
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

const KanbanTemplate = model("kanbantemplate", kanbanTemplateSchema);

export default KanbanTemplate;

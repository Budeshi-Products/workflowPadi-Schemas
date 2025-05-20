import mongoose from "mongoose";
const { model, Schema } = mongoose;

const KanbanTemplateSchema = new Schema(
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
				ref: "KanbanColumn",
				required: true,
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
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

const KanbanTemplate = model("KanbanTemplate", KanbanTemplateSchema);
export default KanbanTemplate;
export { KanbanTemplateSchema as schema };

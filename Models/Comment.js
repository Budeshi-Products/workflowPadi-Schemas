import mongoose from "mongoose";
const { model, Schema } = mongoose;

const CommentSchema = new Schema(
	{
		text: {
			type: String,
		},

		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
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
const Comment = model("Comment", CommentSchema);
export default Comment;
export { CommentSchema as schema };

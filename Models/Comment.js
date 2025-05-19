import mongoose from "mongoose";
const { model, Schema } = mongoose;

let commentSchema = new Schema(
	{
		text: {
			type: String,
		},

		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "employee",
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

let Comment = model("comment", commentSchema);

export default Comment;

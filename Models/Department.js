import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Department name is required"],
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "employee", // Assuming your employee model is named 'employee'
			},
		],
		deleted: {
			// For soft delete
			type: Boolean,
			default: false,
			select: false, // Usually hidden unless specifically requested
		},
		organizationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "organization", // Assuming your organization model is named 'organization'
			required: true,
			index: true, // Index for faster queries scoped to an organization
		},
	},
	{ timestamps: true },
);

// Ensure department names are unique within the same organization
departmentSchema.index({ organizationId: 1, name: 1 }, { unique: true });

// Pre-find hook to automatically filter out soft-deleted documents
departmentSchema.pre(/^find/, function (next) {
	// Only apply if the query doesn't explicitly ask for deleted items
	if (this.getFilter().deleted !== true) {
		this.where({ deleted: { $ne: true } });
	}
	next();
});

export default mongoose.model("department", departmentSchema); // Use lowercase 'department' as model name
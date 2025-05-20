import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
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
				ref: "Employee", // Updated to match Employee model casing
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
			ref: "Organization", // Updated to match Organization model casing
			required: true,
			index: true, // Index for faster queries scoped to an organization
		},
	},
	{ timestamps: true },
);

// Ensure department names are unique within the same organization
DepartmentSchema.index({ organizationId: 1, name: 1 }, { unique: true });

// Pre-find hook to automatically filter out soft-deleted documents
DepartmentSchema.pre(/^find/, function (next) {
	// Only apply if the query doesn't explicitly ask for deleted items
	if (this.getFilter().deleted !== true) {
		this.where({ deleted: { $ne: true } });
	}
	next();
});

// Export the model with consistent casing
const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
export { DepartmentSchema as schema };

import mongoose from "mongoose";
const { model, Schema } = mongoose;

let calendarSchema = new Schema(
	{
		title: {
			type: String,
		},

		organizer: {
			type: String,
		},

		description: {
			type: String,
		},

		className: {
			type: String,
		},

		start: {
			type: Date,
			required: true,
			validate: {
				validator: function (value) {
					return value >= new Date(); // Check if the date is not in the past
				},
				message: "Start date must be in the future.",
			},
		},
		startTime: {
			type: String,
		},

		end: {
			type: Date,
			validate: {
				validator: function (endDate) {
					const startDate = new Date(this.start);
					// Calculate the minimum allowed end date (30 minutes ahead of start date)
					const minEndDate = new Date(startDate.getTime() + 30 * 60 * 1000); // Add 30 minutes in milliseconds
					return endDate >= minEndDate;
				},
				message:
					"Event End Date must be at least 30 minutes ahead of event Start Date",
			},
			default: function () {
				const startDate = new Date(this.start);
				// Set the default end date to be one day after the start date
				startDate.setDate(startDate.getDate() + 1);
				return startDate;
			},
		},

		stopTime: {
			type: String,
		},

		allDay: {
			type: Boolean,
			default: false,
		},
		dow: {
			type: [String], // An array of strings to represent days of the week (e.g., ["Monday", "Wednesday"])
		},

		address: {
			type: String,
		},

		location: {
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

let Calendar = model("calendar", calendarSchema);

export default Calendar;

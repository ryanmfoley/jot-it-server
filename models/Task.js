const mongoose = require('../db/connection');

const TaskSchema = new mongoose.Schema(
	{
		description: String,
		dueDate: Date,
		completed: {
			type: Boolean,
			default: false,
		}
	},
	{
		timestamp: true,
	}
);

module.exports = TaskSchema;

const mongoose = require('../db/connection');

const TaskSchema = new mongoose.Schema(
	{
		description: String,
		dueDate: {
			type: Date,
			required: true,
		},
		completed: false,
	},
	{
		timestamp: true,
	}
);

module.exports = TaskSchema;

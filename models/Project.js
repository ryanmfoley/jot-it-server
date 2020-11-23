const mongoose = require('../db/connection')

const TaskSchema = require('./Task')

const ProjectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		dueDate: {
			type: Date,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		links: String,
		tasks: [TaskSchema],
	},
	{
		timestamp: true,
	}
)

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project

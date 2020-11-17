const mongoose = require('../db/connection')

// const taskSchema = require('./Task')

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: true
        },
        description: String,
        dueDate: {
            type: Date,
            required: true
        },
        completed: false,
        links: String,
        // tasks: [taskSchema]
    }, 
    {
        timestamp: true
    }
)

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
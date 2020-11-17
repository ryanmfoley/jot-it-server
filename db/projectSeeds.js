const mongoose = require('./connection')

const Project = require('../models/Project')
// const Task = require('../models/Task')

const projectSeeds = require('./seed.json')

Project.deleteMany({})
    .then(() => {
        Project.insertMany(projectSeeds)
    })
    .then(console.log())
    .catch(console.error)
    .finally(() => {
        process.exit
    })
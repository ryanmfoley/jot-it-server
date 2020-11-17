const express = require('express')
const router = express.Router()

const Project = require('../models/Project')

// GET

router.get('/', (req, res, next) => {
    Project.find({})
})

// POST

// PATCH

// DELETE
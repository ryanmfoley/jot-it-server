const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

//____________________________________________________________

// GET

router.get('/', (req, res, next) => {
	Project.find({})
		.then((projects) => {
			res.json(projects);
		})
		.catch(next);
});

// GET one

router.get('/:id', (req, res, next) => {
	Project.findById(req.params.id)
		.then((project) => {
			if (!project) {
				res.sendStatus(404);
			} else {
				res.json(project);
			}
		})
		.catch(next);
});

// POST

router.post('/', (req, res, next) => {
	const projectData = req.body;
	Project.create(projectData)
		.then((project) => {
			res.json(project);
		})
		.catch(next);
});

// PATCH

router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const projectData = req.body;
	Project.findByIdAndUpdate(
		id,
		projectData,
		{new: true})
		.then((project) => res.json(project))
		.catch(next);
});


// DESTROY

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Project.findByIdAndRemove(id)
		.then(() => res.sendStatus(204))
		.catch(next);
});

//____________________________________________________________

module.exports = router;

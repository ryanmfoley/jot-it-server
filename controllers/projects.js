const express = require('express');
const router = express.Router();

const Project = require('../models/project');

//____________________________________________________________

// GET

router.get('/', (req, res, next) => {
	Project.find({})
		.then((projects) => {
			res.json(projects);
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
	Project.findByIdAndUpdate(
		id,
		{
			title: req.body.title,
			// description: req.body.description,
			// dueDate: req.body.dueDate,
			// completed: req.body.completed,
			// links: req.body.links,
			//tasks: req.body.tasks
		},
		{ new: true }
	)
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

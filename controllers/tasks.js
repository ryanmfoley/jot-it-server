const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// POST
router.post('/', (req, res, next) => {
	const taskData = req.body;
	const projectId = taskData.projectId;
	Project.findById(projectId)
		.then((project) => {
			project.task.push(taskData);
			return project.save();
		})

		.then((project) => res.status(201).json({ project }))
		.catch(next);
});
//Patch
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const taskData = req.body;

	Project.findOne({
		'task._id': id,
	})
		.then((project) => {
			const task = project.task.id(id);
			task.set(taskData);
			return project.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

//Delete
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Project.findOneById(id)
		.then((project) => {
			project.task.id(id).remove();
			return project.save();
		})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;

const mongoose = require('./connection');

const Quote = require('../models/Quote');

const quoteSeeds = require('./quoteSeed.json');

Quote.deleteMany({})
	.then(() => {
		Quote.insertMany(quoteSeeds);
	})
	.then(console.log())
	.catch(console.error)
	.finally(() => {
		process.exit;
	});

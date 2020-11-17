const mongoose = require('../db/connection');

const QuoteSchema = new mongoose.Schema({
	quote: String,
	author: {
		type: String,
		required: true,
	},
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;

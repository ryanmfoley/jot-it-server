const mongoose = require("mongoose")

const mongoURI =
	process.env.NODE_ENV === 'production'
		? process.env.DB_URL
    : 'mongodb://localhost/projects-db';
    
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})

module.exports = mongoose;
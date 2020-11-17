const mongoose = require("mongoose")

const mongoURI = 'mongodb/localhost:/projects-db';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})

module.exports = mongoose;
const mongoose = require('../db/connection');

const TaskSchema = new mongoose.Schema(

{
  title: {
    type: String,
    required = true,
  }, 
  
  description: String,
  
  dueDate: {
    type: Date,
    required: true,
  },
  completed: false,
  
},
{
  timestamp: true
}
);

module.exports = mongoose.model('Task', TaskSchema)

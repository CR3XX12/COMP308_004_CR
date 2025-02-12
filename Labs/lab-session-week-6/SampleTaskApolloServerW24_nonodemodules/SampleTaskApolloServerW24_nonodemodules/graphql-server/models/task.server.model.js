//task.server.model.js
// Load the module dependencies
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'TaskSchema'
const TaskSchema = new Schema({
    taskId: { type: String, unique: true, required: true },
    taskName: String,
    taskDescription: String,
    startDate: String,
    endDate: String,
    owner: String
});
// Create the 'Task' model out of the 'TaskSchema'
const Task = mongoose.model('Task', TaskSchema); 

// Export the 'Task' model
module.exports = Task;
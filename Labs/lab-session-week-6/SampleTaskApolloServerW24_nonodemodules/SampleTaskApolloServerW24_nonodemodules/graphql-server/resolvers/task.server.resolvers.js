const Task = require('../models/task.server.model');

// Resolver for fetching all tasks
const getTasks = async () => {
  return await Task.find();
};

// Resolver for fetching a single task by ID
const getTaskById = async (parent, { id }) => {
  return await Task.findById(id);
};

// Resolver for creating a new task
const createTask = async (parent, args) => {
  const task = new Task(args);
  return await task.save();
};

// Resolver for updating an existing task
const updateTask = async (parent, args) => {
  console.log('args in update task:', args);
  const { id, ...update } = args;
  const options = { new: true };
  return await Task.findByIdAndUpdate(id, update, options);
};

// Resolver for deleting a task
const deleteTask = async (parent, { id }) => {
  return await Task.findByIdAndDelete(id);
};

// Combined resolvers object
const resolvers = {
  Query: {
    tasks: getTasks,
    task: getTaskById,
  },
  Mutation: {
    createTask,
    updateTask,
    deleteTask,
  },
};

// Correctly export the combined resolvers object
module.exports = resolvers;

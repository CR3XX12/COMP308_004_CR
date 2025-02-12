// Import gql from apollo-server
const { gql } = require('apollo-server-express');

// Define your schema using GraphQL schema language
const typeDefs = gql`
  type Task {
    id: ID
    taskId: String
    taskName: String
    taskDescription: String
    startDate: String
    endDate: String
    owner: String
  }

  type Query {
    tasks: [Task]
    task(id: String): Task
  }

  type Mutation {
    createTask(
      taskId: String,
      taskName: String,
      taskDescription: String,
      startDate: String,
      endDate: String,
      owner: String
    ): Task

    updateTask(
      id: ID!,
      taskId: String,
      taskName: String,
      taskDescription: String,
      startDate: String,
      endDate: String,
      owner: String
    ): Task
    
    deleteTask(id: ID!): Task
  }
`;
// Make typeDefs available to other modules
module.exports = typeDefs;
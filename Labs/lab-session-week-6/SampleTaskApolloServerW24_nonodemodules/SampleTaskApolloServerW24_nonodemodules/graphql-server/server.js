const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schemas/task.server.schema');
const resolvers = require('./resolvers/task.server.resolvers');

async function startServer() {
  const app = express();
  
  // Connect to MongoDB
  mongoose.connect('mongodb://localhost:27017/crud-graphql-db2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));
  // Create a new ApolloServer instance and pass the schema data
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  // Apply Apollo GraphQL middleware and specify the path to /graphql
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer();

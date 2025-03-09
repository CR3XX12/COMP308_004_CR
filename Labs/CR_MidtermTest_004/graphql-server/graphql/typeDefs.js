const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    year: Int!
    genre: String!
    description: String!
    rating: Float!
    watched: Boolean
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }

  type Mutation {
    addMovie(
      title: String!
      year: Int!
      genre: String!
      description: String!
      rating: Float!
      watched: Boolean
    ): Movie

    updateMovie(
      id: ID!
      title: String
      year: Int
      genre: String
      description: String
      rating: Float
      watched: Boolean
    ): Movie

    deleteMovie(id: ID!): Movie  #  Added Delete Mutation
  }
`;

module.exports = typeDefs;

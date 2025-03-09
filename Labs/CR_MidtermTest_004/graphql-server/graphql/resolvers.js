const Movie = require("../models/movie");

const resolvers = {
  Query: {
    movies: async () => await Movie.find(),
    movie: async (_, { id }) => await Movie.findById(id),
  },
  Mutation: {
    addMovie: async (_, { title, year, genre, description, rating, watched }) => {
      const newMovie = new Movie({ title, year, genre, description, rating, watched });
      return await newMovie.save();
    },
    updateMovie: async (_, { id, title, year, genre, description, rating, watched }) => {
      return await Movie.findByIdAndUpdate(
        id,
        { title, year, genre, description, rating, watched },
        { new: true }
      );
    },
    deleteMovie: async (_, { id }) => {
      const deletedMovie = await Movie.findByIdAndDelete(id);
      if (!deletedMovie) throw new Error("Movie not found");
      return deletedMovie;
    },
  },
};

module.exports = resolvers;

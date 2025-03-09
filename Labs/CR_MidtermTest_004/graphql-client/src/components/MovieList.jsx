import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";

// GraphQL Query to Get All Movies
const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      year
      genre
      description
      rating
      watched
    }
  }
`;

// GraphQL Mutation to Delete Movie
const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

function MovieList() {
  const { loading, error, data, refetch } = useQuery(GET_MOVIES);
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }], // Refresh the list after deletion
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie({ variables: { id } });
        console.log(`Movie with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Movie List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Watched</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>{movie.genre}</td>
              <td>{movie.description}</td>
              <td>{movie.rating}</td>
              <td>{movie.watched ? "Yes " : "No "}</td>
              <td>
                <Link to={`/editmovie/${movie.id}`} style={{ marginRight: "10px" }}>
                   Edit
                </Link>
                <button
                  onClick={() => handleDelete(movie.id)}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    marginLeft: "10px",
                  }}
                >
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => refetch()} variant="secondary"> Refetch</Button>
    </div>
  );
}

export default MovieList;

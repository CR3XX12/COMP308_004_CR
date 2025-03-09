import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// GraphQL Query to Fetch All Movies (for refetching)
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

// GraphQL Mutation to Add Movie
const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $year: Int!, $genre: String!, $description: String!, $rating: Float!, $watched: Boolean) {
    addMovie(title: $title, year: $year, genre: $genre, description: $description, rating: $rating, watched: $watched) {
      id
      title
    }
  }
`;

function CreateMovie() {
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }], //Auto-refresh movie list after adding
  });
  const navigate = useNavigate(); //Used for redirection

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [watched, setWatched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMovie({
        variables: { 
          title, 
          year: parseInt(year), 
          genre, 
          description, 
          rating: parseFloat(rating), 
          watched 
        },
      });
      console.log("Movie added successfully!");
      navigate("/movielist"); //Redirects user after adding
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <Container>
      <h2>Add Movie</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="Watched" checked={watched} onChange={(e) => setWatched(e.target.checked)} />
        </Form.Group>
        <Button type="submit">Add Movie</Button>
      </Form>
    </Container>
  );
}

export default CreateMovie;

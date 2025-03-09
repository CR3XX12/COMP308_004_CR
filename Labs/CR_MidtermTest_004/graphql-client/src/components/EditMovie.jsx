import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";

// GraphQL Query to Get a Single Movie
const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
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

// GraphQL Mutation to Update Movie
const UPDATE_MOVIE = gql`
  mutation UpdateMovie($id: ID!, $title: String, $year: Int, $genre: String, $description: String, $rating: Float, $watched: Boolean) {
    updateMovie(id: $id, title: $title, year: $year, genre: $genre, description: $description, rating: $rating, watched: $watched) {
      id
      title
    }
  }
`;

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MOVIE, { variables: { id } });
  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIE, variables: { id } }, "GetMovies"], // Refetch to update UI immediately
  });
  

  const [formState, setFormState] = useState({
    title: "",
    year: "",
    genre: "",
    description: "",
    rating: "",
    watched: false,
  });

  // Load Movie Data into Form Once Data is Fetched
  useEffect(() => {
    if (data && data.movie) {
      setFormState({
        title: data.movie.title,
        year: data.movie.year,
        genre: data.movie.genre,
        description: data.movie.description,
        rating: data.movie.rating,
        watched: data.movie.watched,
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movie.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie({
      variables: {
        id,
        title: formState.title,
        year: parseInt(formState.year),
        genre: formState.genre,
        description: formState.description,
        rating: parseFloat(formState.rating),
        watched: formState.watched, // Ensure watched is always passed
      },
    });
    navigate("/movielist");
  };

  return (
    <Container>
      <h2>Edit Movie</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" value={formState.year} onChange={(e) => setFormState({ ...formState, year: parseInt(e.target.value) })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" value={formState.genre} onChange={(e) => setFormState({ ...formState, genre: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control type="number" value={formState.rating} onChange={(e) => setFormState({ ...formState, rating: parseFloat(e.target.value) })} />
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="Watched" checked={formState.watched} onChange={(e) => setFormState({ ...formState, watched: e.target.checked })} />
        </Form.Group>
        <Button type="submit">Update Movie</Button>
      </Form>
    </Container>
  );
}

export default EditMovie;

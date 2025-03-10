import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// Queries and Mutations
const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
      author
    }
  }
`;

const App = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [addBook] = useMutation(ADD_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author) return;
    await addBook({ variables: newBook });
    setNewBook({ title: '', author: '' });
    refetch();
  };

  const handleDeleteBook = async (id) => {
    await deleteBook({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>GraphQL Books</h1>
      <div>
        <h2>Add a Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <div>
        <h2>Books List</h2>
        <ul>
          {data.books.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}{' '}
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

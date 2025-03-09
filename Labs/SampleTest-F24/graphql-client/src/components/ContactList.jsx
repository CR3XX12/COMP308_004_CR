import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
//import { gql, useQuery } from '@apollo/client';
import { gql, useQuery, useMutation } from "@apollo/client";
// import Button from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';


// Query to fetch contacts
const GET_CONTACTS = gql`
query GetContacts {
contacts {
id
contactId
name
email
phone
address
}
}
`;

//delete query
const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id) {
      id
    }
  }
`;


function ContactList() {
const { loading, error, data, refetch } = useQuery(GET_CONTACTS);

//Delete function
const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: ["GetContacts"], // Refresh list after deleting
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact({ variables: { id } });
    }
  };

if (loading) return <Spinner animation="border" />;
if (error) return <p>Error :(</p>;
return (
<div>
<h2>Contact List</h2>
<Table striped bordered hover>
<thead>
<tr>
<th>Contact ID</th>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Address</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{data.contacts.map((contact) => (
<tr key={contact.id}>
<td>{contact.contactId}</td>
<td>{contact.name}</td>
<td>{contact.email}</td>
<td>{contact.phone}</td>
<td>{contact.address}</td>
<td>
<Link to={`/editcontact/${contact.id}`}>Edit</Link>
<button onClick={() => handleDelete(contact.id)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>
          Delete
        </button>
</td>
</tr>
))}
</tbody>
</Table>
<Button variant="secondary" onClick={() => refetch()}>Refetch</Button>
</div>
);
}


export default ContactList;
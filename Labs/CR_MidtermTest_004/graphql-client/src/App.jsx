import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import MovieList from "./components/MovieList";
import EditMovie from "./components/EditMovie";
import CreateMovie from "./components/CreateMovie";
import Home from './components/Home';
function App() {
return (
<Router>
<Navbar bg="primary" variant="dark" expand="lg">
<Container>
<Navbar.Brand href="home">React Client For GraphQL API</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="mr-auto">
<Nav.Link as={Link} to="/home">Home</Nav.Link>
<Nav.Link as={Link} to="/createmovie">Create Movie</Nav.Link>
<Nav.Link as={Link} to="/movielist">Movie List</Nav.Link>
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
<div>
<Routes>
<Route index element={<Home />} />
<Route path="home" element={<Home />} />
<Route path="/movielist" element={<MovieList />} />
<Route path="/editmovie/:id" element={<EditMovie />} />
<Route path="/createmovie" element={<CreateMovie />} />
</Routes>
</div>
</Router>
);
}
export default App;
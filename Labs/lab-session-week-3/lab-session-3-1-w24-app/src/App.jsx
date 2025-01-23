import React, { useState } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import View from './View';

function App() {
  const [auth, setAuth] = useState('auth');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const authenticateUser = async () => {
    try {
      //
      console.log(username)
      console.log(password)
      //verify the credentials (just hardcoding here)
      if (username === 'john' && password === '123') {
        setAuth('authenticated'); // update the state
        console.log(auth);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  };
  return (
    <div className="App">
      {auth !== 'authenticated'
        ? <div>
          <Form >
            <Form.Group size="lg" >
              <Form.Control type="text" name="username" id="username"
                placeholder="Enter user name" onChange={e =>
                  setUsername(e.target.value)} />
              <Form.Control type="password" name="password"
                id="password" placeholder="Enter password" onChange={e =>
                  setPassword(e.target.value)} />
            </Form.Group>
            <Button size="lg" variant="primary" type="Button"
              onClick={authenticateUser}>
              Login
            </Button>
          </Form>
        </div>
        : <View auth={auth} username={username} />
      }
    </div>
  );
}

export default App
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App(props) {
  const [users, setUsers] = useState('');

  const getUsers = () => {
    axios
      .get('http://localhost:5000/users')
      .then(users => setUsers(users))
      .catch(err => console.log(err));
    console.log(users);
  };

  console.log(users);

  return (
    <div className='App'>
      <h1>React Bitchezzzzz</h1>
      <button onClick={() => getUsers()}>Fetch Users</button>
    </div>
  );
}

export default App;

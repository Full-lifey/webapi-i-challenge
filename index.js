// implement your API here
const express = require('express');

const users = require('./data/db.js');

const server = express();

server.get('/', (req, res) => {
  res.send('Get is working!!!');
});

server.get('/users', (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  users
    .findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

server.post('/users', (req, res) => {
  const userInfo = req.body;

  users
    .insert(userInfo)
    .then(user => {})
    .catch();
});

const port = 5000;
server.listen(port, () => console.log(`Running on port ${port}`));

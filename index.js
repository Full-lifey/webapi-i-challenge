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
      res.status(500).json(err);
    });
});

const port = 5000;
server.listen(port, () => console.log(`Running on port ${port}`));

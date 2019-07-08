// implement your API here
const express = require('express');
const cors = require('cors');

const users = require('./data/db.js');

const server = express();

server.use(express.json());
server.use(cors());

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
  if (userInfo.name && userInfo.bio) {
    users
      .insert(userInfo)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  users
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (changes.name && changes.bio) {
    users
      .update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The user information could not be modified.' });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user' });
  }
});

const port = 5000;
server.listen(port, () => console.log(`Running on port ${port}`));

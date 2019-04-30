const express = require('express');
const db = require('./zoosDB.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(zoos => res.status(200).json(zoos))
    .catch(_err => res.status(500).json({message: "Error fetching zoos."}));
});

router.post('/', (req, res) => {
  const zoo = req.body;
  if (zoo.name && zoo.name !== '') {
    db.insert(zoo)
      .then(zoo => res.status(201).json(zoo))
      .catch(error => res.status(500).json({message: "Error creating zoo.", error}));
  } else {
    res.status(400).json({message: "Zoo requires name."});
  }
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  db.getById(id)
    .then(zoo => zoo
          ? res.status(200).json(zoo)
          : res.status(404).json({message: "Zoo with ID does not exist."}))
    .catch(_err => res.status(500).json({message: "Error fetching zoo."}));
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  db.remove(id)
    .then(deleted => deleted
          ? res.status(204).end()
          : res.status(404).json({message: "Zoo with ID does not exist."}))
    .catch(_err => res.status(500).json({message: "Error deleting zoo."}));
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  if (changes.name && changes.name !== '') {
    db.update(id, changes)
      .then(updated => updated
            ? db.getById(id)
            .then(zoo => res.status(200).json(zoo))
            .catch(error => res.status(500).json(
              {message: "Zoo updated, but an error occurred when fetching updated data", error}
            ))
            : res.status(404).json({message: "Zoo with ID does not exist."}))
      .catch(_err => res.status(500).json({message: "Error updating zoo."}));
  } else {
    res.status(400).json({message: "Changes are required to update zoo."});
  }
});

module.exports = router;



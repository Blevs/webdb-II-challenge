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

module.exports = router;



const express = require('express');
const db = require('./zoosDB.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(zoos => res.status(200).json(zoos))
    .catch(_err => res.status(500).json({message: "Error fetching zoos."}));
});

module.exports = router;



const db = require('../data/db.js');

module.exports = {
  get,
  getById,
  insert
};

function get() {
  return db('zoos');
};

function getById(id) {
  return db('zoos').select().where({id}).first();
};

function insert(zoo) {
  return db('zoos').insert(zoo, 'id').then(([id]) => getById(id));
};

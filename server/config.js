var path = require('path');
var sqlite = require('sqlite3');
var bookshelf = require('bookshelf');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'allMonsters.sqlite')
  },
  debug: true,
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

db.knex.schema.createTableIfNotExists('monsters', function (monsters) {
  monsters.increments('id').primary();
  monsters.string('name', 50);
  monsters.string('color', 50);
  monsters.string('sound', 100);
}).then(function(table) {
  console.log('TableExists', table);
});

module.exports = db;

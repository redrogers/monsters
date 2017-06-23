//requirements
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./server/config');
var knex = require('knex');
var bookshelf = require('bookshelf');

//start server
var app = express();
app.use(express.static('Client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//instantiate db model and collection
//some way this is not working from the config page
var Monster = db.Model.extend({
  tableName: 'monsters'
});
var Monsters = new db.Collection();
Monsters.model = Monster;

//return monster based on id
app.get('/monsters/:id', function(req, res) {
  var id = req.params.id;
  Monster.where ('id', id).fetch()
  .then(function(monster) {
    res.status(200).json(monster);
  })
  .catch(function(err) {
    console.log(err);
  });
});

//return all monsters in table
app.get('/monsters', function(req, res) {
  Monster.fetchAll().then(function(data) {
      res.status(200).json(data);
  }).catch(function(err) {
    console.log(err);
  });
});


//create new monster if doesn't exist, or send error
app.post('/monsters', function(req, res) {
  var name = req.body.name;
  var sound = req.body.sound;
  var color = req.body.color;

  Monsters.create({
    name: name,
    sound: sound,
    color: color
  })
  .then(function(newMonster) {
    res.status(200).send(newMonster);
  })
  .catch(function(err) {
    console.log(err);
  });
});

//update existing monster by id
app.put('/monsters/:id', function(req, res) {
  var id = req.params.id;
  Monster.where({id: id}).fetch()
    .then(function(monster) {
      return monster.save({
        // name: 'Homer Simpson',
        // color: 'purple',
        // sound: 'doh'
        name: req.body.name || monster.get('name'),
        sound: req.body.sound || monster.get('sound'),
        color: req.body.color || monster.get('color')
      });
    })
    .then (function (monster) {
      console.log(monster);
      res.status(200).send(monster);
    })
    .catch (function (err) {
      res.status(500).send();
    });
});

//delete existing monster by name
app.delete('/monsters/:id', function(req, res) {
  var id = req.params.id;
  new Monster({id: id}).fetch().then(function(monster) {
    monster.destroy()
    .then(function () {
      res.status(200).send();
    })
    .catch(function (err) {
      res.status(500).send();
    });
  });
});

module.exports = app;
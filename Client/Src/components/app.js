angular.module('monsters', [])

.controller('AppCtrl', function($http) {
  this.monsters = [];
  var app = this;

  this.addMonster = function(monster) {
    var reqBody = angular.copy(monster);
    $http.post('/monsters', reqBody)
    .then(function(res) {
      console.log(res);
    })
    .then(function () {
      app.getMonsters();
    })
    .catch(function(err) {
      console.error(err);
    });
  };

  this.getMonsters = function() {
    $http.get('/monsters')
    .then(function(res) {
      app.monsters = res.data;
      console.log(app.monsters, app);
    });
  };

  this.updateMonster = function (monster) {
    var reqBody = angular.copy(monster);
    var id = reqBody.id;
    $http.put('/monsters/' + id, reqBody)
    .then(function(res) {
      console.log(res);
    })
    .then(function () {
      app.getMonsters();
    })
    .catch(function (err) {
      console.error(err);
    });
  };
})

.component('app', {

  controller: 'AppCtrl',
  templateUrl: 'src/templates/app.html'

});
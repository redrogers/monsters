angular.module('monsters', [])

.controller('AppCtrl', function($http) {
  this.monsters = [];
  var app = this;

  this.addMonster = function(monster) {
    var resBody = angular.copy(monster);
    $http.post('/monsters', resBody)
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
})

.component('app', {

  controller: 'AppCtrl',
  templateUrl: 'src/templates/app.html'

});
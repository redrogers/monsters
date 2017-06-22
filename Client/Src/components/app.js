angular.module('monsters', [])

.controller('AppCtrl', function($http) {
  this.monsters = [];
  var that = this;

  this.getMonsters = function() {
    $http.get('/monsters')
    .then(function(res) {
      that.monsters = res.data;
      console.log(that.monsters, that);
    });
  };
})

.component('app', {

  controller: 'AppCtrl',
  templateUrl: 'src/templates/app.html'

});
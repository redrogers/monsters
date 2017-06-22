angular.module('monsters')

.controller('AllMonstersCtrl', function() {

})

.component('allMonsters', {

  bindings: {
    monsters: '<'
  },
  controller: 'AllMonstersCtrl',
  templateUrl: 'src/templates/allMonsters.html'

});
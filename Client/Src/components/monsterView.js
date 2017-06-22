angular.module('monsters')
.controller('MonsterViewCtrl', function() {

})

.component('monsterView', {

  bindings: {
    monster: '<'
  },
  controller: 'MonsterViewCtrl',
  templateUrl: 'src/templates/monsterView.html'
});
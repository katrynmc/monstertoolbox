angular.module('MonsterParts',[


  ])
.controller('MainCtrl', function($scope){
  $scope.categories = [
    {"id": 0, "name": "Eyes"},
    {"id": 1, "name": "Noses"},
    {"id": 2, "name": "Ears"},
    {"id": 3, "name": "Mouths"},
    {"id": 4, "name": "Legs"},
    {"id": 5, "name": "Arms"},
    {"id": 6, "name": "Tails"},
    {"id": 7, "name": "Horns"}
  ];

  $scope.parts = [
    {"id": 0, "location": "/assets/eye1.png", "category": "Eyes" }
  ];

  $scope.greeting = 'Frankenstein';
});

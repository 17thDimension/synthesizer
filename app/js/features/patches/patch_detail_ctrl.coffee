angular.module("synthesizer")

# A simple controller that shows a tapped item's data
.controller "PatchDetailCtrl", ($scope, $stateParams, PetService) ->
  $scope.patch = PatchService.get($stateParams.petId)

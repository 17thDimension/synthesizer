angular.module("synthesizer")

# A simple controller that fetches a list of data from a service
.controller "PatchIndexCtrl", ($scope, PatchService) ->
  $scope.patches = PatchService.all()

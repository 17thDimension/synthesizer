angular.module("synthesizer")

# A simple controller that fetches a list of data from a service
.controller "PatchIndexCtrl", ($scope, BoardService) ->
  $scope.boards = BoardService.all()

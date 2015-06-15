angular.module("synthesizer")

# A simple controller that shows a tapped item's data
.controller "SynthCtrl", ($scope, $stateParams, SynthService) ->
  console.log('begin synth')
  $scope.nodes=SynthService.nodes
  $scope.activateNode= (key)->
    SynthService.activate(key)
  $scope.silenceNode = (key)->
    SynthService.silence(key)

  $scope.keyPress = ()->
    console.log('up')
  $scope.keyRelease = ()->
    console.log('down')
  findNodeKey=(e)->
    e = e or window.event
    charCode = if typeof e.which == 'number' then e.which else e.keyCode
    switch
      when charCode == 37 then '←'
      when charCode == 38 then '↑'
      when charCode == 39 then '→'
      when charCode == 40 then '↓'
      else String.fromCharCode(charCode).toUpperCase()

  document.onkeydown = (e) ->
    nodeKey=findNodeKey(e)
    $scope.activateNode(nodeKey)
    return
  document.onkeyup = (e) ->
    nodeKey=findNodeKey(e)
    $scope.silenceNode(nodeKey)
    return

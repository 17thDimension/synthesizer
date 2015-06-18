angular.module("synthesizer")

# A simple controller that shows a tapped item's data
.controller "SynthCtrl", ($scope,$stateParams
    ,AudioContextService,AudioAnalyserService
    SynthService,BiquadService,RecordService) ->

  SynthService.initialize()
  $scope.recording= RecordService.isRecording
  $scope.nodes=SynthService.nodes

  $scope.activateNode= (key)->
    SynthService.activate(key)
  $scope.silenceNode = (key)->
    SynthService.silence(key)

  $scope.updateCutoff = (val)->
    BiquadService.setCutoff(val*100)
  $scope.updateGain = (val)->
    BiquadService.setGain(val*2)
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

  $scope.toggleRecording = ()->
    $scope.recording=!$scope.recording
    if $scope.recording
      console.log 'start'
      RecordService.startRecording()
    else
      console.log 'stop'
      RecordService.stopRecording()
  document.onkeydown = (e) ->
    nodeKey=findNodeKey(e)
    $scope.activateNode(nodeKey)
    return
  document.onkeyup = (e) ->
    nodeKey=findNodeKey(e)
    $scope.silenceNode(nodeKey)
    return

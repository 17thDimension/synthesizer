angular.module("synthesizer")

# A simple controller that shows a tapped item's data
.controller "SynthCtrl", ($scope,$stateParams
    ,AudioContextService,AudioAnalyserService,SynthService,BiquadService,
    RecordService,StateService,TrackService,NodeService,GainService) ->

  SynthService.initialize()
  $scope.context=AudioContextService.getContext()
  $scope.recording= RecordService.isRecording
  $scope.nodes=SynthService.nodes
  $scope.tracks=TrackService.getTracks()
  $scope.getState=StateService.getState
  $scope.activateNode= (key)->
    NodeService.activate(key)
  $scope.silenceNode = (key)->
    NodeService.silence(key)

  $scope.updateCutoff = (val)->
    BiquadService.setCutoff(val*100)
  $scope.updateGain = (vol,destination)->
    GainService.setVolume vol,destination
  findNodeKey=(e)->
    e = e or window.event
    charCode = if typeof e.which == 'number' then e.which else e.keyCode
    switch
      when charCode == 91 then 'command'
      when charCode == 16 then 'shift'
      when charCode == 17 then 'control'
      when charCode == 18 then 'option'
      when charCode == 37 then '←'
      when charCode == 38 then '↑'
      when charCode == 39 then '→'
      when charCode == 40 then '↓'

      else String.fromCharCode(charCode).toUpperCase()
  $scope.toggleSamplerMode = ()->
    StateService.toggleState('sampler')
  $scope.toggleRecording = ()->
    $scope.recording=!$scope.recording
    if $scope.recording
      RecordService.startRecording()
    else
      RecordService.stopRecording (buffer)->
        TrackService.addTrack buffer

  document.onkeydown = (e) ->
    nodeKey=findNodeKey(e)
    $scope.activateNode(nodeKey)
    return
  document.onkeyup = (e) ->
    nodeKey=findNodeKey(e)
    $scope.silenceNode(nodeKey)
    return

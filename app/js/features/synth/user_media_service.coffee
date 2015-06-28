###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "UserMediaService",($window,$rootScope,AudioContextService,
  AudioAnalyserService,GainService,TrackService) ->
  context=AudioContextService.getContext()
  inputAnalyser = AudioAnalyserService.getAnalyser('input')
  inputGain = GainService.getGain('input')
  userMediaGain = GainService.createGain('user-media')
  navigator.getUserMedia = navigator.getUserMedia or
    navigator.webkitGetUserMedia or
    navigator.mozGetUserMedia or
    navigator.msGetUserMedia
  getUserStream:()->
    $window.userMediaStream
  initialize:(cb)->
    if navigator.getUserMedia
      navigator.getUserMedia { audio: true }, ((stream) ->
        window.userMediaStream = context.createMediaStreamSource stream
        console.log userMediaGain,window.userMediaStream
        window.userMediaStream.connect userMediaGain
        if cb
          cb window.userMediaStream,null
      ), (err) ->
        console.log 'error' , err
        if cb
          cb null,err

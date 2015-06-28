###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "RecordService",($window,$rootScope,AudioContextService,
  AudioAnalyserService,GainService,TrackService) ->
  context=AudioContextService.getContext()
  source = 'output'
  outputAnalyser = AudioAnalyserService.getAnalyser('output')
  inputAnalyser = AudioAnalyserService.getAnalyser('input')
  sourceStream = GainService.getGain('output')
  inputGain = GainService.getGain('input')
  recorder = new Recorder(sourceStream)
  recording = false
  service=@
  updateState:(state)->
    console.log(@)
    if state == 'sampler'
      @setSource('input')
    else
      @setSource('output')
  setSource:(src)->
    console.log(@,src)
    source=src
    if src  == 'input'
      GainService.setVolume(1,'user-media')
    else
      GainService.setVolume(0,'user-media')

  getMediaStream:()->
    $window.userMediaStream
  getSource:()->
    source
  getRecorder:()->
    recorder
  isRecording:()->
    recording
  startRecording: () ->
    recording = yes
    recorder.record()

  stopRecording: (callback) ->
    recording= no
    recorder.stop()
    recorder.getBuffer (buffer) ->
      callback(buffer)
      recorder.clear()
  toggleRecording: (callback) ->
    if @isRecording()
      @stopRecording(callback)
    else
      @startRecording()

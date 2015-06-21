###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "RecordService",($rootScope,AudioContextService,
  AudioAnalyserService,GainService,TrackService) ->
  context=AudioContextService.getContext()
  source = 'output'
  analyser = AudioAnalyserService.getAnalyser()
  sourceStream = GainService.getGain()
  inputGain = GainService.getGain('input')
  localStream = null
  recorder = new Recorder(sourceStream)
  recording = false
  userMediaStream = null
  service=@
  navigator.getUserMedia = navigator.getUserMedia or
    navigator.webkitGetUserMedia or
    navigator.mozGetUserMedia or
    navigator.msGetUserMedia

  $rootScope.$on 'stateChanged', ($scope,state)->
    self=service.$get()
    if state == 'sampler'
      self.setSource('input')
    else
      self.setSource('output')
  getLocalSource:()-> #convert this ot a promise
    if navigator.getUserMedia
      navigator.getUserMedia { audio: true }, ((stream) ->
        sourceStream = context.createMediaStreamSource(stream)
        gain=GainService.getGain('input')
        sourceStream.connect gain
        gain.connect analyser
        recorder.destroy()
        recorder = new Recorder(gain)
        return
      ), (err) ->
        return

  setSource:(src)->
    source=src
    if src  == 'output'
      recorder.destroy()
      sourceStream = GainService.getGain()
      recorder = new Recorder(sourceStream)
    if src  == 'input'
      @getLocalSource()


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

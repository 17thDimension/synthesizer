###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "RecordService",(AudioContextService,
  AudioAnalyserService,TrackService) ->
  context=AudioContextService.getContext()
  source = null
  recorder = new Recorder(AudioAnalyserService.getAnalyser())
  recording = false
  navigator.getUserMedia = navigator.getUserMedia or
    navigator.webkitGetUserMedia or
    navigator.mozGetUserMedia or
    navigator.msGetUserMedia

  getLocalSource:()->
    if navigator.getUserMedia
      navigator.getUserMedia { audio: true }, ((stream) ->
        source = context.createMediaStreamSource(stream)
        console.log recorder
        recorder = new Recorder(AudioAnalyserService.getAnalyser())

        return
      ), (err) ->
        return


  getSource:()->
    source
  getRecorder:()->
    recorder
  isRecording:()->
    recording
  startRecording: () ->
    recording= yes
    recorder.record()
  stopRecording: () ->
    recording= no
    recorder.stop()
    recorder.getBuffer (buffer) ->
      TrackService.addTrack buffer
  toggleRecording: () ->
    if @isRecording()
      @stopRecording()
    else
      @startRecording()

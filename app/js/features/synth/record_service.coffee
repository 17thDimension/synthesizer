###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "RecordService",(AudioContextService,
  BiquadService,TrackService) ->
  context=AudioContextService.getContext()
  source = null
  recorder = new Recorder(BiquadService.getFilter())
  recording = false
  navigator.getUserMedia = navigator.getUserMedia or
    navigator.webkitGetUserMedia or
    navigator.mozGetUserMedia or
    navigator.msGetUserMedia

  if navigator.getUserMedia
    navigator.getUserMedia { audio: true }, ((stream) ->
      source = context.createMediaStreamSource(stream)
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
    console.log(recorder)
    recorder.exportWAV (blob) ->
      console.log(blob,'YARGLE')
      url = URL.createObjectURL(blob)
      li = document.createElement('li')
      au = document.createElement('audio')
      hf = document.createElement('a')
      au.controls = true
      au.src = url
      hf.href = url
      console.log(url)
      hf.download = (new Date).toISOString() + '.wav'
      hf.innerHTML = hf.download
  toggleRecording: () ->
    console.log @isRecording()
    if @isRecording()
      @stopRecording()
    else
      @startRecording()

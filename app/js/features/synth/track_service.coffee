###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "TrackService", ($rootScope,AudioContextService,AudioAnalyserService)->
  tracks=[]
  context = AudioContextService.getContext()

  audioStreamFromBuffer:(buffers)->
    newSource = context.createBufferSource()
    newBuffer = context.createBuffer 2, buffers[0].length, context.sampleRate
    newBuffer.getChannelData(0).set buffers[0]
    newBuffer.getChannelData(1).set buffers[1]
    newSource.buffer = newBuffer
    newSource
  addTrack:(buffers)->
    newSource = @audioStreamFromBuffer(buffers)
    newSource.connect AudioAnalyserService.getAnalyser()
    test=newSource.start 0
    newSource.loop = yes
    newSource.loopStart=0
    tracks.push newSource
  getTracks:()->
    tracks
  get: (index) ->
    if typeof tracks[index] != 'undefined'
      return new Track(nodeKey)
    else
      console.log('no track')
  all: () ->
    tracks

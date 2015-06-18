###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "TrackService", (AudioContextService,AudioAnalyserService)->
  tracks=[]
  context = AudioContextService.getContext()

  addTrack:(buffers)->
    newSource = context.createBufferSource()
    newBuffer = context.createBuffer 2, buffers[0].length, context.sampleRate
    newBuffer.getChannelData(0).set buffers[0]
    newBuffer.getChannelData(1).set buffers[1]
    newSource.buffer = newBuffer
    newSource.connect AudioAnalyserService.getAnalyser()
    newSource.start 0
    newSource.loop = yes
    newSource.loopStart=0
    tracks.push newSource
    console.log tracks
  get: (index) ->
    if typeof tracks[index] != 'undefined'
      return new Track(nodeKey)
    else
      console.log('no track')
  all: () ->
    tracks

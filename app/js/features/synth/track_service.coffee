###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "TrackService", ()->
  tracks={}
  class Track
    constructor: (@key) ->
      console.log(@key)

  get: (key) ->
    if typeof tracks[nodeKey] == 'undefined'
      tracks[nodeKey]=new Track(key)
    return new Track(nodeKey)
  mix:()->
    console.log('mix')
    for track,key of tracks
      console.log key

###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "TimeService", (TrackService)->

  slow: (track,speed) ->

    TrackService.get(track)
    console.log('slow down'+track+' by '+ speed)
  silence: (nodeKey) ->
    node[patchId].silence()

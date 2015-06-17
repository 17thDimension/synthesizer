###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "AudioContextService", ($window)->
  nodes={}
  context = new ($window.AudioContext || $window.webkitAudioContext)()

  getContext: () ->
    return context

###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "LoopService", ()->
  instantLoop = yes
  toggleInstantLoop: () ->
    instantLoop=!instantLoop
  instantLoopEnabled: () ->
    instantLoop

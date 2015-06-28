###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "ReverbService", (AudioContextService)->

  context = AudioContextService.getContext()
  reverb = context.createConvolver()
  getReverb: () ->
    return reverb

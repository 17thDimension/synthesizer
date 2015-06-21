###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "BiquadService", (AudioContextService)->

  context = AudioContextService.getContext()
  filter = context.createBiquadFilter()
  filter.type = "highshelf"
  filter.frequency.value = 0
  filter.gain.value = 0
  getFilter: () ->
    return filter
  setCutoff: (cutoff) ->
    filter.frequency.value = cutoff
  getCutoff: () ->
    filter.frequency.value
  setGain: (gain) ->
    filter.gain.value = gain

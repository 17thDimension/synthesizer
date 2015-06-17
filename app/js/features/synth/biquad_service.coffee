###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "BiquadService", (AudioContextService)->

  context = AudioContextService.getContext()
  filter = context.createBiquadFilter()
  filter.type = "lowshelf"
  filter.frequency.value = 1000
  filter.gain.value = 25
  getFilter: () ->
    return filter
  setCutoff: (cutoff) ->
    filter.frequency.value = cutoff
  getCutoff: () ->
    filter.frequency.value
  setGain: (gain) ->
    filter.gain.value = gain

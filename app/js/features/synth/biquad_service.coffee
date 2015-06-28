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
  supportedParams =
    'lowpass': [
      'Q'
      'frequency'
    ]
    'highpass': [
      'Q'
      'frequency'
    ]
    'bandpass': [
      'Q'
      'frequency'
    ]
    'lowshelf': [
      'Q'
      'gain'
    ]
    'highshelf': [
      'Q'
      'gain'
    ]
    'peaking': [
      'Q'
      'frequency'
      'gain'
    ]
    'notch': [
      'Q'
      'frequency'
    ]
    'allpass': [
      'Q'
      'frequency'
    ]

  getFilter: () ->
    return filter
  setFrequency: (cutoff) ->
    filter.frequency.value = cutoff
  getFrequency: () ->
    filter.frequency.value
  setDetune: (tune) ->
    filter.detune.value = tune
  getDetune: () ->
    filter.detune.value
  setQ: (quality) ->
    filter.Q.value = quality
  getQ: () ->
    filter.Q.value
  setGain: (gain) ->
    filter.gain.value = gain
  getType: () ->
    filter.type
  setType: (type) ->
    filter.type=type
  supports: (parameter) ->
    supportedParamsForType=@getModeParameters(@getType())
    supportedParamsForType.indexOf parameter
  getFilterModes: (gain) ->
    Object.keys(supportedParams)
  getModeParameters: (mode) ->
    supportedParams[mode]

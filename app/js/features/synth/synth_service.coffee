###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "SynthService",(NodeService, OscillatorService, RecordService,
                BiquadService,AudioAnalyserService,GainService,
                AudioContextService) ->
  nodes = NodeService.initializeNodes()

  context = AudioContextService.getContext()
  oscillators = OscillatorService.initializeOscillators()
  analyser = AudioAnalyserService.getAnalyser()
  filter = BiquadService.getFilter()
  gain = GainService.getGain()

  initialize:() ->
    for osc in oscillators
      osc.connect filter
    filter.connect analyser
    analyser.connect gain
    gain.connect context.destination

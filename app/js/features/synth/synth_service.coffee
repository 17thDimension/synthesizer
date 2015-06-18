###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "SynthService",(NodeService, OscillatorService, RecordService,
                BiquadService,AudioAnalyserService,AudioContextService) ->
  nodes = NodeService.initializeNodes()

  context = AudioContextService.getContext()
  oscillators = OscillatorService.initializeOscillators()
  analyser = AudioAnalyserService.getAnalyser()
  filter = BiquadService.getFilter()

  initialize:() ->
    for osc in oscillators
      osc.connect filter
    filter.connect analyser
    analyser.connect context.destination

  activate: (o) ->
    if typeof nodes[o] == 'undefined'
      console.log(nodes)
    nodes[o].activate()
  silence: (o) ->
    if typeof nodes[o] != 'undefined'
      nodes[o].silence()

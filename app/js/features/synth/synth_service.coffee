###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "SynthService",(NodeService, OscillatorService, RecordService,
                BiquadService,AudioAnalyzerService,AudioContextService) ->
  nodes = NodeService.initializeNodes()

  oscillators = OscillatorService.initializeOscillators()
  analyzer = AudioAnalyzerService.getAnalyzer()
  filter = BiquadService.getFilter()
  context = AudioContextService.getContext()

  initialize:() ->
    for osc in oscillators
      osc.connect filter
    filter.connect analyzer

    analyzer.connect context.destination
  activate: (o) ->
    if typeof nodes[o] == 'undefined'
      console.log(nodes)
    nodes[o].activate()
  silence: (o) ->
    if typeof nodes[o] != 'undefined'
      nodes[o].silence()

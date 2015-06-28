###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "SynthService",(NodeService, OscillatorService, RecordService,
                BiquadService,AudioAnalyserService,GainService,
                AudioContextService,UserMediaService,ReverbService) ->
  nodes = NodeService.initializeNodes()

  context = AudioContextService.getContext()
  oscillators = OscillatorService.initializeOscillators()
  inputAnalyser = AudioAnalyserService.getAnalyser('input')
  outputAnalyser = AudioAnalyserService.getAnalyser('output')
  filter = BiquadService.getFilter()
  reverb = ReverbService.getReverb()
  outputGain = GainService.getGain('output')
  inputGain = GainService.getGain('input')
  userMediaGain = GainService.getGain('user-media')

  initialize:() ->
    UserMediaService.initialize()
    for osc in oscillators
      osc.connect osc.vol
      osc.vol.connect inputGain
    userMediaGain.connect inputGain
    inputGain.connect inputAnalyser
    inputAnalyser.connect filter
    filter.connect outputGain
    outputGain.connect outputAnalyser
    outputAnalyser.connect context.destination

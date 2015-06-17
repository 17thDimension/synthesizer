###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "AudioAnalyzerService", ($window,AudioContextService)->

  context = AudioContextService.getContext()
  analyzer = context.createAnalyser()
  analyzer.connect context.destination
  getAnalyzer: () ->
    return analyzer

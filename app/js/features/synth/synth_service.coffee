###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "SynthService",(NodeService) ->
  console.log(NodeService)
  nodes=NodeService.initializeNodes()
  console.log(nodes)
  activate: (o) ->
    if typeof nodes[o] == 'undefined'
      console.log(nodes)
    nodes[o].activate()
  silence: (o) ->
    if typeof nodes[o] != 'undefined'
      nodes[o].silence()

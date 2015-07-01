###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "StreamChainService", (AudioContextService)->

  context = AudioContextService.getContext()
  graph = []

  appendConnection: (inputNode,outputNode) ->
    graph.push [inputNode,outputNode]
  insertNode: (node,index) ->
    nodes_to_push=[]
    while chain.length > index
      nodes_to_push.push chain.pop()
    chain.push node
    for p_node in nodes_to_push
      chain.push p_node
    reconnect()
  getGraph:()->
    graph
  reconnect: () ->
    for node_pair in graph
      for node in node_pair
        node.disconnect()
    for node_pair in graph
      node_pair[0].connect node_pair[1]
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

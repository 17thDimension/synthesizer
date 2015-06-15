###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "LoopService", ()->
  nodes={}
  class Node
    constructor: (@key) ->
    silence: (velocity) ->
      console.log(velocity)
    activate: (velocity) ->
      console.log(velocity)
  all: ->
    []

  nodeForKey: (nodeKey) ->
    return new Node(nodeKey)
  silence: (nodeKey) ->
    node[patchId].silence()

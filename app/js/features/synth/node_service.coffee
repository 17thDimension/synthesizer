###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "NodeService", (
  OscillatorService,
  TimeService,
  RecordService,
  TrackService,
  LoopService ) ->

  class Node

    constructor: (@key) ->
      @active=no
    silence: (velocity) ->
      @active=no
    sustain: (velocity) ->
      console.log(@key)
    activate: (velocity) ->
      if @active
        @sustain(velocity)
      else
        @active=yes

  class IvoryNode extends Node

    constructor:(@key,@frequency) ->
      super(@key)

    activate:(velocity)->

      if !@active
        OscillatorService.nodeOn @
      super(velocity)

    silence:(velocity)->
      OscillatorService.nodeOff @
      super()
  class RecordNode extends Node

    constructor:(@key) ->
      super(@key)

    activate:(velocity)->
      if !@active
        RecordService.toggleRecording()
      super(velocity)

    silence:(velocity)->
      super()


  ivory_keys="abcdefghijklmnopqrstuvwxyz1234567890"
  control_keys = ",./;[]`-='← → ↑ ↓"
  record_key = " "
  initializeNodes : () ->
    nodes={}
    for key in ivory_keys.toUpperCase().split('')
      nodes[key] = new IvoryNode(
        key,
        OscillatorService.frequencyForKey key
      )

    nodes[record_key]=new RecordNode(record_key)
    nodes
  nodeForKey: (key)->
    return @nodes[key]

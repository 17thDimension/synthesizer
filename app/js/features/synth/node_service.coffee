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

  class OscillatorNode extends Node

    constructor:(@key,@frequency) ->
      super(@key)

    activate:(velocity)->

      if !@active
        console.log('note on' +@key)
        OscillatorService.nodeOn @
      super(velocity)

    silence:(velocity)->
      OscillatorService.nodeOff @
      super()
  class RecordNode extends Node

    constructor:(@key) ->
      super(@key)

    activate:(velocity)->
      super(velocity)
      RecordService.startRecording()

    silence:(velocity)->
      OscillatorService.nodeOff @
      RecordService.startRecording()
      super()


  oscillator_keys="abcdefghijklmnopqrstuvwxyz1234567890"
  control_keys = ",./;[]`-='← → ↑ ↓"
  record_key = " "
  initializeNodes : () ->
    nodes={}
    for key in oscillator_keys.toUpperCase().split('')
      nodes[key] = new OscillatorNode(
        key,
        OscillatorService.frequencyForKey key
      )

    nodes[record_key]=new RecordNode(record_key)
    nodes
  nodeForKey: (key)->
    return @nodes[key]

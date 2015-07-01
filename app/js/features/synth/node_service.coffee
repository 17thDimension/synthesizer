###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "NodeService", (
  OscillatorService,
  TimeService,
  RecordService,
  TrackService,
  ShiftService,
  StateService,
  AudioAnalyserService,
  HudService,
  LoopService) ->

  class Node

    constructor: (@key) ->
      @active=no
    silence: (velocity) ->
      @active=no
    sustain: (velocity) ->
      @velocity+=1
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
  class RootModifierNode extends Node
    constructor:(@key,@multiplier) ->
      super(@key)

    activate:(velocity)->
      if !@active
        newRoot=OscillatorService.getRootFrequency()*@multiplier
        OscillatorService.setRootFrequency newRoot
      super(velocity)

    silence:(velocity)->
      super()


  class ShiftNode extends Node

    constructor:() ->
      super('shift')

    activate:(velocity)->
      if !@active
        ShiftService.shift()
      super(velocity)

    silence:(velocity)->
      ShiftService.unShift()
      super()

  class RecordNode extends Node

    constructor:(@key) ->
      super(@key)

    activate:(velocity)->
      if !@active
        RecordService.toggleRecording (buffer)->
          TrackService.addTrack buffer,LoopService.instantLoopEnabled
          HudService.paint()


      super(velocity)

    silence:(velocity)->
      super()
  class StateToggleNode extends Node

    constructor:(@key,@state) ->
      super(@key)

    activate:(velocity)->
      if !@active
        StateService.toggleState (@state)
      super(velocity)

    silence:(velocity)->
      super()

  class SampleNode extends Node

    constructor:(@key) ->
      super(@key)

    activate:(velocity)->
      if ShiftService.isShifted() and !@active
        console.log('start sample')
        RecordService.startRecording()
      else if !@active
        console.log 'playSample'
        console.log @stream
        if _.defined @stream
          console.log @stream,AudioAnalyserService.getAnalyser('input')
          @stream.play AudioAnalyserService.getAnalyser('input')
      super(velocity)


    silence:(velocity)->
      if ShiftService.isShifted()
        node=@
        RecordService.stopRecording (buffer)->
          node.stream=TrackService.audioStreamFromBuffer buffer
          node.stream.connect AudioAnalyserService.getAnalyser()
      super()


  ivory_keys="abcdefghijklmnopqrstuvwxyz1234567890"
  control_keys = ",./;`-='← → ↑ ↓"
  record_key = " "
  nodes={}
  initializeNodes : () ->
    for state in StateService.all()
      nodes[state]={}
    defaultState=StateService.getDefaultState()
    for key in ivory_keys.toUpperCase().split('')
      nodes['keys'][key] = new IvoryNode(
        key,
        OscillatorService.frequencyForKey key
      )
      nodes['sampler'][key] = new SampleNode(
        key
      )

    nodes['keys'][record_key]=new RecordNode(record_key)
    nodes['keys']['['] = new RootModifierNode('[',.5)
    nodes['keys'][']'] = new RootModifierNode(']',2)
    nodes['keys']['shift']= new ShiftNode()
    nodes['keys']['control']= new StateToggleNode('control','sampler')
    nodes

  activate:(key)->
    @nodeForKey(key).activate()
  silence:(key) ->
    @nodeForKey(key).silence()
  nodeForKey: (key)->
    node= nodes[StateService.getState()][key]
    if !_.defined node
      node = nodes[StateService.getDefaultState()][key]
    node
  getfirstActiveNodeKey:()->
    for node in nodes
      if node.active
        return node

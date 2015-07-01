###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "DelayService", (AudioContextService)->
  context=AudioContextService.getContext()
  delay=context.createDelay()
  feedback=context.createGain()
  currentVolume=1
  delay.connect feedback
  feedback.connect delay
  setFeedback:(vol) ->
    feedback.gain.value = vol
  getOutput:() ->
    feedback
  mute: (destination) ->
    if not _.defined destination
      destination = 'output'
    control.gain.value = 0
  unMute: (destination) ->
    if not _.defined destination
      destination = 'output'
    gainNodes[destination].gain.value = currentVolume
  max: (destination) ->
    if not _.defined destination
      destination = 'output'
    @setVolume(1,destination)

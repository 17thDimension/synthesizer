###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "GainService", (AudioContextService)->
  context=AudioContextService.getContext()
  control=context.createGain()
  currentVolume=1
  gainNodes={'output':context.createGain(),'input':context.createGain()}
  setVolume:(vol,destination) ->
    console.log(vol,destination)
    if not _.defined destination
      destination = 'output'
    currentVolume=vol
    gainNodes[destination].gain.value=vol
  getGain:(destination)->
    if not _.defined destination
      destination = 'output'
    if not _.defined gainNodes[destination]
      return @createGain(destination)
    gainNodes[destination]
  createGain:(name) ->
    gainNodes[name]=context.createGain()
    gainNodes[name]
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

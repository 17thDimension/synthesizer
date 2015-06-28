###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "StateService",($rootScope,RecordService) ->
  defaultState = 'keys'
  state = defaultState
  states =['keys','sampler','sequencer','editor']
  stateHistory=[]
  toggleState:(requestedState) ->
    if state==requestedState
      @setState stateHistory.pop()
    else
      stateHistory.push(state)
      @setState requestedState
  getState:()->
    state
  getDefaultState:()->
    defaultState
  all:()->
    states
  setState:(newState)->
    RecordService.updateState(newState)
    state=newState

###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "StateService",($rootScope) ->
  defaultState = 'keys'
  state = defaultState
  states =['keys','sampler','sequencer','editor']
  stateHistory=[]
  toggleState:(requestedState) ->
    console.trace()
    console.log 'toggle' + requestedState
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
    console.log newState
    $rootScope.$broadcast 'stateChanged', newState
    state=newState

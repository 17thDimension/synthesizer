###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "OscillatorService", (AudioContextService,AudioAnalyserService)->
  audioContext=AudioContextService.getContext()
  oscillators=[]
  initializeOscillators:()->
    addOscillator = (type)->
      osc=audioContext.createOscillator()
      osc.type='sine'
      osc.frequency.value = 0
      osc.start()
      oscillators.push osc
    addOscillator('sin')
    addOscillator('sin')
    addOscillator('sin')
    addOscillator('sin')
    addOscillator('sin')
    addOscillator('sin')
    return oscillators
  fetchOscillator:(node)->
    for osc in oscillators
      if _.defined osc.originNode
        if osc.originNode.key == node.key && node.active
          return osc
      else if not node.active
        return osc
  nodeOn: (node)->
    osc=@fetchOscillator(node)
    osc.originNode=node
    osc.frequency.value=node.frequency
  nodeOff: (node)->
    osc=@fetchOscillator(node)
    osc.frequency.value=0
    delete osc.originNode
  frequencyForKey: (key)->
    root=256
    ratioDictionary=
      Z: 1 #c
      X: 9/8 #d
      C: 5/4 #e
      V: 10/9 #f
      B: 9/8
      N: 32/27
      M: 6/5
      A: 4/3
      S: 3/2
      D: 5/3
      F: 27/20
      G: 45/32
      H: 729/512
      J: 3/2
      K: 128/81
      L: 8/5
      Q: 16/9 #Bb
      W: 2
      E: 10/4
      R: 9/5
      T: 15/8
      Y: 243/128
      U: 2
      I: 20/9
      O: 42/7
      P: 42/7
      1: 42/7
      2: 42/7
      3: 42/7
      4: 42/7
      5: 42/7
      6: 42/7
      7: 42/7
      8: 42/7
      9: 42/7
      0: 42/7
    return root*ratioDictionary[key]

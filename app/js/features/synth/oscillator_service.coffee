###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "OscillatorService", (AudioContextService,GainService,
  AudioAnalyserService)->
  audioContext=AudioContextService.getContext()
  oscillators=[]
  rootFrequency=256
  release = .1
  attack = 0
  getRootFrequency:()->
    rootFrequency
  setRootFrequency:(newFrequency)->
    rootFrequency=newFrequency
  initializeOscillators:()->
    addOscillator = (type)->
      osc=audioContext.createOscillator()
      osc.name = 'osc '+oscillators.length
      osc.type=type
      osc.frequency.value = 0
      osc.vol=GainService.createGain(type)
      osc.start()
      oscillators.push osc
    addOscillator('sine')
    addOscillator('sine')
    addOscillator('sine')
    addOscillator('sine')
    addOscillator('sine')
    addOscillator('sine')
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
    osc.frequency.value=node.frequency*rootFrequency
    osc.vol.gain.value=1
  nodeOff: (node)->
    osc=@fetchOscillator(node)
    osc.vol.gain.value=0
    delete osc.originNode
  frequencyForKey: (key)->
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
      G: 3/2
      H: 5/3
      J: 7/4
      K: 16/9
      L: 9/5
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
      1: 1/7
      2: 2/7
      3: 3/7
      4: 4/7
      5: 42/7
      6: 42/7
      7: 42/7
      8: 42/7
      9: 42/7
      0: 42/7
    return ratioDictionary[key]

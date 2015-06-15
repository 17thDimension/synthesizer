###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "OscillatorService", ()->
  glide = T('param', value: 20)
  synth = T('sin',
    freq: glide
    mul: 0.2).play()
  T('scope', interval: 10).on('data', ->
    @plot target: document.getElementsByTagName('canvas')[0]
    return
  ).listen synth
  nodeOn: (node)->
    console.log(node)
    glide.linTo node.frequency, '100ms'
    #synth.noteOnWithFreq(node.frequency)
  nodeOff: (node)->
    #synth.noteOffWithFreq(node.frequency)
  frequencyForKey: (key)->
    root=100
    ratioDictionary=
      Z: 1
      X: 256/243
      C: 16/15
      V: 10/9
      B: 9/8
      N: 32/27
      M: 6/5
      A: 5/4
      S: 81/64
      D: 4/3
      F: 27/20
      G: 45/32
      H: 729/512
      J: 3/2
      K: 128/81
      L: 8/5
      Q: 5/3
      W: 27/16
      E: 16/9
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
    console.trace()
    console.log key,ratioDictionary[key]
    console.log root*ratioDictionary[key]
    return root*ratioDictionary[key]

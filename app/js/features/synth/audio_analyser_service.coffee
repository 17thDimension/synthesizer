###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "AudioAnalyserService", ($window,AudioContextService)->

  context = AudioContextService.getContext()
  ianalyser = context.createAnalyser()
  oanalyser = context.createAnalyser()
  ianalyser.fftSize = 2048
  oanalyser.fftSize = 2048
  ivisualizer = ''
  ovisualizer = ''
  icanvas = document.getElementById('inputWaveForm')
  ocanvas = document.getElementById('outputWaveForm')
  WIDTH=icanvas.clientWidth
  HEIGHT=icanvas.clientHeight
  ipainter = icanvas.getContext("2d")
  opainter = ocanvas.getContext("2d")
  initialized= no
  $window.drawOutputWaveForm=()->
    ovisualizer = requestAnimationFrame(drawOutputWaveForm)
    bufferLength = oanalyser.frequencyBinCount

    timeBuffer = new Uint8Array(bufferLength)
    oanalyser.getByteTimeDomainData(timeBuffer)
    opainter.fillStyle = 'rgb(255, 255, 255)'
    opainter.fillRect 0, 0, WIDTH, HEIGHT
    opainter.lineWidth = 1
    opainter.strokeStyle = 'rgb(100, 100, 255)'
    opainter.beginPath()
    sliceWidth = WIDTH * 1.0 / bufferLength
    x = 0
    i = 0
    opainter.moveTo 0, opainter.height/2
    while i < bufferLength
      y = timeBuffer[i]/2
      if i == 0
        opainter.moveTo x, y
      else
        opainter.lineTo x, y
      x += sliceWidth
      i++

    opainter.lineTo opainter.width, opainter.height
    opainter.stroke()
  $window.drawInputWaveForm=()->
    ivisualizer = requestAnimationFrame(drawInputWaveForm)
    bufferLength = ianalyser.frequencyBinCount

    timeBuffer = new Uint8Array(bufferLength)
    ianalyser.getByteTimeDomainData(timeBuffer)
    ipainter.fillStyle = 'rgb(255, 255, 255)'
    ipainter.fillRect 0, 0, WIDTH, HEIGHT
    ipainter.lineWidth = 1
    ipainter.strokeStyle = 'rgb(100, 100, 255)'
    ipainter.beginPath()
    sliceWidth = WIDTH * 1.0 / bufferLength
    x = 0
    i = 0
    ipainter.moveTo 0, ipainter.height/2
    while i < bufferLength
      y = timeBuffer[i]/2
      if i == 0
        ipainter.moveTo x, y
      else
        ipainter.lineTo x, y
      x += sliceWidth
      i++

    ipainter.lineTo ipainter.width, ipainter.height
    ipainter.stroke()
  getAnalyser: (type) ->
    if not @initialized
      @initialize()
    if type == 'input'
      return ianalyser
    else
      return oanalyser
  initialize:()->
    @initialized = yes
    $window.analyzer=ianalyser
    $window.drawInputWaveForm()
    $window.drawOutputWaveForm()

###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "AudioAnalyserService", ($window,AudioContextService)->

  context = AudioContextService.getContext()
  analyser = context.createAnalyser()
  analyser.fftSize = 2048
  visualizer = ''
  canvas = document.getElementById('visualizer')
  WIDTH=canvas.clientWidth
  HEIGHT=canvas.clientHeight
  painter = canvas.getContext("2d")
  initialized= no
  $window.drawOscilliscope=()->
    visualizer = requestAnimationFrame(drawOscilliscope)
    bufferLength = analyser.frequencyBinCount

    timeBuffer = new Uint8Array(bufferLength)
    analyser.getByteTimeDomainData(timeBuffer)
    painter.fillStyle = 'rgb(255, 255, 255)'
    painter.fillRect 0, 0, WIDTH, HEIGHT
    painter.lineWidth = 1
    painter.strokeStyle = 'rgb(100, 100, 255)'
    painter.beginPath()
    sliceWidth = WIDTH * 1.0 / bufferLength
    x = 0
    i = 0
    painter.moveTo 0, painter.height/2
    while i < bufferLength
      y = timeBuffer[i]/2
      if i == 0
        painter.moveTo x, y
      else
        painter.lineTo x, y
      x += sliceWidth
      i++

    painter.lineTo painter.width, painter.height
    painter.stroke()
  getAnalyser: () ->
    if not @initialized
      @initialize()
    return analyser
  initialize:()->

    @initialized = yes
    $window.drawOscilliscope()

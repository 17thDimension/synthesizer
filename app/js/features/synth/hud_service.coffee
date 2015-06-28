###
A simple example service that returns some data.
###
angular.module("synthesizer")

.factory "HudService",($window,TrackService) ->
  hud = $window.document.getElementById('hud')
  context = hud.getContext('2d')
  paint : () ->
    WIDTH=1000
    HEIGHT=108
    tracks = TrackService.getTracks()
    context.fillStyle = 'rgb(255, 255, 255)'
    context.fillRect 0, 0, WIDTH, HEIGHT
    context.lineWidth = 1
    context.strokeStyle = 'rgb(0, 0, 0)'
    context.beginPath()
    for track ,index in tracks
      dataArray = track.buffer.getChannelData(0)
      sliceWidth = WIDTH / dataArray.length
      x = 0
      i = 0
      while i < dataArray.length
        v = dataArray[i]
        y = v + index*HEIGHT/tracks.lenght
        if i == 0
          context.moveTo x, y
        else
          context.lineTo x, y
        x += sliceWidth
        i++
      context.lineTo hud.width, hud.height / index
    context.stroke()

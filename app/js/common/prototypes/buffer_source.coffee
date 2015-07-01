AudioBufferSourceNode.prototype.play = (destination)->
  @destination=destination
  console.log @played
  if @played != yes
    @start 0
    @played=yes
  else
    @replay()

AudioBufferSourceNode.prototype.replay = ()->
  console.log 'replay'
  context=@context
  newSource = context.createBufferSource()
  newSource.buffer=@buffer
  newSource.connect @destination
  newSource.start 0
